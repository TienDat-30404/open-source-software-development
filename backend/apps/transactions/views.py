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
class PurchaseSubscriptionView(APIView):
    """ Mua gói đăng ký """
    # permission_classes = [IsAuthenticated]
    def post(self, request):
        # user = request.user
        user=User.objects.first()
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
                end_date=now() + timedelta(days=plan.duration_days),
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
    # permission_classes = [IsAuthenticated]

    def put(self, request):
        # user = request.user
        user=User.objects.first()
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
    # permission_classes = [IsAuthenticated]

    def put(self, request):
        # user = request.user
        user=User.objects.first()
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
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        is_premium = Subscription.objects.filter(user=User.objects.first(), status='active', end_date__gt=now()).exists()
        return success_response(data={"is_premium": is_premium})
class CurrentSubscriptionView(APIView):
    """ Lấy thông tin gói đăng ký hiện tại của người dùng """
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        # user = request.user
        user=User.objects.first()
        subscription = Subscription.objects.filter(user=user, status='active').first()

        if not subscription:
            return Response({"message": "Bạn chưa có gói đăng ký nào."}, status=status.HTTP_200_OK)
        return success_response(data=SubscriptionSerializer(subscription).data)
