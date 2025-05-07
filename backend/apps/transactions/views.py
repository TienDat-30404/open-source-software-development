from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils.timezone import now, timedelta
from .models import  Subscription, PaymentTransaction
from ..plans.models import Plan
from ..payment_methods.models import PaymentMethod 
from .serializers import SubscriptionSerializer
from ..users.models import User 
from ..utils.response import success_response,error_response
import os
import json
import requests
import hmac
import hashlib
import urllib.parse
from datetime import datetime
from dotenv import load_dotenv
from django.conf import settings
from django.http import JsonResponse
from dateutil.relativedelta import relativedelta

load_dotenv()
def sort_object_vnpay(obj):
    return dict(sorted(obj.items()))

def generate_mac(data, key):
    return hmac.new(key.encode('utf-8'), data.encode('utf-8'), hashlib.sha256).hexdigest()

class PurchaseSubscriptionView(APIView):
    """ Mua gói đăng ký """
    def post(self, request):
        user = request.user
        print("user", user)
       
        plan_id = request.data.get("plan_id")
        payment_method_id=request.data.get("payment_method_id")
        auto_renew = request.data.get("auto_renew", True)
        try:
            payment_method=PaymentMethod.objects.get(id=payment_method_id)
        except PaymentMethod.DoesNotExist:
            return Response({"error": "Phương thức thanh toán không tồn tại"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            plan = Plan.objects.get(id=plan_id)
        except Plan.DoesNotExist:
            return Response({"error": "Gói đăng ký không tồn tại"}, status=status.HTTP_400_BAD_REQUEST)
        # Kiểm tra nếu người dùng đã có gói đăng ký active 
        existing_subscription = Subscription.objects.filter(user=user, status='active').first()
        if existing_subscription:
            remaining_days = (existing_subscription.end_date - now()).days
            if remaining_days > 0:
                return Response({
                    "message": f"Bạn đã có gói đăng ký  {existing_subscription.plan.name}, còn {remaining_days}  ngày sử dụng."
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    "message": f"Bạn đã có gọi đăng ký    {existing_subscription.plan.name} đã hết hạn  {existing_subscription.end_date} , vui lòng gia hạn hoặc hủy gói hiện tại"
                }, status=status.HTTP_400_BAD_REQUEST)
        # Tạo giao dịch thanh toán (ban đầu ở trạng thái pending)
        payment_transaction = PaymentTransaction.objects.create(
            user=user,
            subscription=None,  # Chưa có Subscription, sẽ cập nhật sau
            amount=plan.price,
            payment_method=payment_method,
            status="pending"
        )

        # === Giả lập thanh toán ===
        # Ở đây bạn có thể gọi API của VNPay hoặc bất kỳ cổng thanh toán nào khác
        # Giả sử thanh toán thành công:
        payment_transaction.status = "success"
        payment_transaction.save()

        if payment_transaction.status == "success":
            # Tạo đăng ký mới
            subscription = Subscription.objects.create(
                user=user,
                plan=plan,
                start_date=now(),
                end_date=now() + relativedelta(months=plan.duration_days),
                status='active',
                auto_renew=auto_renew
            )

            # Cập nhật lại subscription_id trong giao dịch
            payment_transaction.subscription = subscription
            payment_transaction.save()
            return success_response({"subscription":SubscriptionSerializer(subscription).data},code=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Thanh toán không thành công"}, status=status.HTTP_400_BAD_REQUEST)

class CancelSubscriptionView(APIView):
    """ Hủy gói đăng ký """
    def put(self, request):
        user = request.user
        try:
            subscription = Subscription.objects.get(user=user, status='active')
        except Subscription.DoesNotExist:
            return error_response(message="Không có gói đăng ký nào để hủy")
        subscription.status = 'canceled'
        subscription.auto_renew = False
        subscription.save()
        return success_response(message="Gói đăng ký đã hủy thành công")

class RenewSubscriptionView(APIView):
    """ Gia hạn gói đăng ký """
    def put(self, request):
        user = request.user
        try:
            subscription = Subscription.objects.get(user=user, status='active', auto_renew=True)
        except Subscription.DoesNotExist:
            return Response({"error": "Không có gói nào để gia hạn"}, status=status.HTTP_400_BAD_REQUEST)
        # Chỉ gia hạn nếu gói đã hết hạn
        if subscription.end_date > now():
            return Response({"error": "Gói chưa hết hạn"}, status=status.HTTP_400_BAD_REQUEST)
        plan = subscription.plan

        # Tạo giao dịch thanh toán với trạng thái "pending"
        payment_transaction = PaymentTransaction.objects.create(
            user=user,
            subscription=subscription,
            amount=plan.price,
            payment_method=None,
            status="pending"
        )

        # === Giả lập thanh toán ===
        # Ở đây có thể gọi API VNPay hoặc một cổng thanh toán khác
        # Giả sử thanh toán thành công:
        payment_transaction.status = "success"
        payment_transaction.save()

        if payment_transaction.status == "success":
            # Gia hạn gói đăng ký
            subscription.renew_subscription()
            return success_response(message="Gói đã được gia hạn thành công")
        else:
            return Response({"error": "Thanh toán không thành công"}, status=status.HTTP_400_BAD_REQUEST)

class CheckPremiumAccessView(APIView):
    """ Kiểm tra quyền truy cập Premium """
    def get(self, request):
        is_premium = Subscription.objects.filter(user=request.user, status='active', end_date__gt=now()).exists()
        return success_response(data={"is_premium": is_premium})
class CurrentSubscriptionView(APIView):
    """ Lấy thông tin gói đăng ký hiện tại của người dùng """
    def get(self, request):
        user = request.user
        subscription = Subscription.objects.filter(user=user, status='active').first()

        if not subscription:
            return Response({"message": "Bạn chưa có gói đăng ký nào."}, status=status.HTTP_200_OK)
        return success_response(data=SubscriptionSerializer(subscription).data)

# vnpay
class ProcessPaymentVNPayView(APIView):
    def post(self, request):
        date = datetime.now()
        create_date = date.strftime('%Y%m%d%H%M%S')
        order_id = date.strftime('%d%H%M%S')

        ip_addr = request.META.get('HTTP_X_FORWARDED_FOR') or request.META.get('REMOTE_ADDR')

        tmn_code = os.getenv('VNPAY_TMN_CODE')
        secret_key = os.getenv('VNPAY_HASH_SECRET')
        vnp_url = os.getenv('VNPAY_URL')
        return_url = os.getenv('VNPAY_RETURN_URL')

        content = request.data.get('content')
        amount = int(request.data.get('amount', 0))

        locale = 'vn'
        curr_code = 'VND'

        vnp_params = {
            'vnp_Version': '2.1.0',
            'vnp_Command': 'pay',
            'vnp_TmnCode': tmn_code,
            'vnp_Locale': locale,
            'vnp_CurrCode': curr_code,
            'vnp_TxnRef': order_id,
            'vnp_OrderInfo': content,
            'vnp_OrderType': 'order',
            'vnp_Amount': amount * 100,
            'vnp_ReturnUrl': return_url,
            'vnp_IpAddr': ip_addr,
            'vnp_CreateDate': create_date
        }

        vnp_params = sort_object_vnpay(vnp_params)
        query_string = urllib.parse.urlencode(vnp_params, doseq=True)

        hmac_obj = hmac.new(secret_key.encode(), query_string.encode('utf-8'), hashlib.sha512)
        signed = hmac_obj.hexdigest()

        vnp_params['vnp_SecureHash'] = signed
        payment_url = f"{vnp_url}?{urllib.parse.urlencode(vnp_params, doseq=True)}"

        return Response({'url': payment_url}, status=200)
    
class PaymentVNPayReturnView(APIView):
    def get(self, request):
        vnp_params = dict(request.query_params)
        secure_hash = vnp_params.pop('vnp_SecureHash', [None])[0]
        vnp_params.pop('vnp_SecureHashType', None)

        # Flatten list if using QueryDict
        for key in vnp_params:
            vnp_params[key] = vnp_params[key][0]

        vnp_params = sort_object_vnpay(vnp_params)

        query_string = urllib.parse.urlencode(vnp_params, doseq=True)
        secret_key = os.getenv('VNPAY_HASH_SECRET')
        return_url = os.getenv('VNPAY_RETURN_URL')

        hmac_obj = hmac.new(secret_key.encode(), query_string.encode('utf-8'), hashlib.sha512)
        signed = hmac_obj.hexdigest()

        return_url += '?' + query_string

        if signed == secure_hash:
            return Response({
                'vnpUrlReturn': return_url,
                'message': 'Thanh toán thành công',
                'totalPrice': vnp_params.get('vnp_Amount'),
                'createdAt': vnp_params.get('vnp_PayDate'),
                'content': vnp_params.get('vnp_OrderInfo'),
                'bank': vnp_params.get('vnp_BankCode'),
                'paymentReferenceId': vnp_params.get('vnp_TxnRef'),
                'statusTransaction': vnp_params.get('vnp_ResponseCode'),
                'status': 200,
                'paymentMethod': '222222'
            })
        else:
            return Response({
                'message': 'Thanh toán thất bại',
                'status': 400
            }, status=status.HTTP_400_BAD_REQUEST)
            
# zalopay 
class ProcessPaymentZalopayView(APIView):
    def post(self, request, *args, **kwargs):
        embed_data = {
            "redirectUrl": os.getenv('ZALOPAY_RETURN_REDICT')
        }
        amount = request.data.get("amount")
        items = [{}]  
        trans_id = str(int(datetime.timestamp(datetime.now())) % 1000000)  
        order = {
            "app_id": os.getenv('ZALOPAY_APP_ID'),
            "app_trans_id": f"{datetime.now().strftime('%y%m%d')}_{trans_id}",
            "app_user": "user123", 
            "app_time": int(datetime.now().timestamp() * 1000),
            "item": json.dumps(items),
            "embed_data": json.dumps(embed_data),
            "amount": amount,
            "description": f"Lazada - Payment for the order #{trans_id}",
        }

        data = "|".join([os.getenv('ZALOPAY_APP_ID'), order["app_trans_id"], order["app_user"],
                         str(order["amount"]), str(order["app_time"]), order["embed_data"], order["item"]])

        # Tính toán MAC (hmacSHA256)
        mac = hmac.new(os.getenv('ZALOPAY_KEY_1').encode(), data.encode(), hashlib.sha256).hexdigest()
        order["mac"] = mac

        # Gửi yêu cầu đến Zalopay API
        response = requests.post(os.getenv('ZALOPAY_ENDPOINT'), data=order)

        return Response(response.json(), status=status.HTTP_200_OK)
    
class CheckTransactionZalopayView(APIView):
    def post(self, request, *args, **kwargs):
        app_trans_id = request.data.get("apptransid")
        post_data = {
            "appid": os.getenv('ZALOPAY_APP_ID'),
            "apptransid": app_trans_id
        }

        # Tạo chuỗi để mã hóa (appid|apptransid|key)
        data = f"{post_data['appid']}|{post_data['apptransid']}|{os.getenv('ZALOPAY_KEY_1')}"

        # Tính toán MAC (hmacSHA256)
        mac = hmac.new(os.getenv('ZALOPAY_KEY_1').encode(), data.encode(), hashlib.sha256).hexdigest()
        post_data["mac"] = mac

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        # Gửi yêu cầu kiểm tra giao dịch đến Zalopay API
        response = requests.post(os.getenv('ZALO_ENDPOINT_TRANSACTION'), data=post_data, headers=headers)

        try:
            return Response(response.json(), status=status.HTTP_200_OK)
        except Exception as err:
            return JsonResponse({"message": f"Fail when checking status Zalopay: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# momo 
class ProcessPaymentMomoView(APIView):
    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        order_info = request.data.get('orderInfo')

        access_key = os.getenv('ACCESS_KEY_MOMO')
        secret_key = os.getenv('SECRET_KEY_MOMO')
        partner_code = 'MOMO'
        redirect_url = os.getenv('MOMO_RETURN_URL')
        ipn_url = os.getenv('MOMO_IPN_URL')
        request_type = "payWithMethod"
        order_id = partner_code + str(int(datetime.now().timestamp() * 1000))

        request_id = order_id
        extra_data = ''
        order_group_id = ''
        auto_capture = True
        lang = 'vi'

        raw_signature = f"accessKey={access_key}&amount={amount}&extraData={extra_data}&ipnUrl={ipn_url}&orderId={order_id}&orderInfo={order_info}&partnerCode={partner_code}&redirectUrl={redirect_url}&requestId={request_id}&requestType={request_type}"

        signature = hmac.new(secret_key.encode(), raw_signature.encode(), hashlib.sha256).hexdigest()

        request_body = json.dumps({
            "partnerCode": partner_code,
            "partnerName": "Test",
            "storeId": "MomoTestStore",
            "requestId": request_id,
            "amount": amount,
            "orderId": order_id,
            "orderInfo": order_info,
            "redirectUrl": redirect_url,
            "ipnUrl": ipn_url,
            "lang": lang,
            "requestType": request_type,
            "autoCapture": auto_capture,
            "extraData": extra_data,
            "orderGroupId": order_group_id,
            "signature": signature
        })

        options = {
            "method": "POST",
            "url": "https://test-payment.momo.vn/v2/gateway/api/create",
            "headers": {
                'Content-Type': 'application/json',
                'Content-Length': str(len(request_body))
            },
            "data": request_body
        }

        try:
            result = requests.post(options["url"], headers=options["headers"], data=options["data"])
            return Response(result.json(), status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as err:
            return JsonResponse({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CheckTransactionMomoView(APIView):
    def post(self, request, *args, **kwargs):
        order_id = request.data.get('orderId')

        string_need_hash = f"accessKey={os.getenv('ACCESS_KEY_MOMO')}&orderId={order_id}&partnerCode=MOMO&requestId={order_id}"
        signature = hmac.new(os.getenv('SECRET_KEY_MOMO').encode(), string_need_hash.encode(), hashlib.sha256).hexdigest()

        request_body = json.dumps({
            "partnerCode": "MOMO",
            "requestId": order_id,
            "orderId": order_id,
            "signature": signature,
            "lang": "en",
        })

        try:
            result = requests.post("https://test-payment.momo.vn/v2/gateway/api/query", headers={
                "Content-Type": "application/json"
            }, data=request_body)

            return Response(result.json(), status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as err:
            return JsonResponse({"error": f"Fail when checking status Momo: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        