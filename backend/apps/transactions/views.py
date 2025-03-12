import hashlib
import hmac
import urllib.parse
from django.conf import settings
from django.http import JsonResponse
from datetime import datetime, timedelta
from django.shortcuts import redirect
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Transaction
from .serializers import TransactionSerializer
from ..users.models import User
from ..plans.models import Plan
from ..payment_methods.models import PaymentMethod
# VNPay Configuration
VNPAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
VNPAY_RETURN_URL = "http://127.0.0.1:8000/api/transactions/vnpay-return"
VNPAY_TMNCODE="AFRBBAVK"
VNPAY_SECRET_KEY="IPPD39X4VQJTXG43JUC6S6C2TTCL9MP0"

class TransactionAPIView(APIView):
    # permission_classes = [IsAuthenticated]  # Chỉ user đăng nhập mới truy cập

    def get(self, request, pk=None):
        """Lấy danh sách giao dịch của user hoặc chi tiết một giao dịch"""
        if pk:
            transaction = get_object_or_404(Transaction, pk=pk, user=request.user)
            serializer = TransactionSerializer(transaction)
            return Response(serializer.data)
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Tạo giao dịch mới"""
        print(VNPAY_TMNCODE)
        print(VNPAY_SECRET_KEY)
        user=User.objects.first()
        plan=Plan.objects.first()
        payment=PaymentMethod.objects.first()
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            transaction = serializer.save(user=user, status="pending",plan=plan,payment_method=payment)
            print(transaction.id)
            now = datetime.now()
            expire_date = now + timedelta(minutes=15)
            # Tạo URL thanh toán VNPay
            vnp_params = {
                "vnp_Version": "2.1.0",
                "vnp_Command": "pay",
                "vnp_TmnCode": VNPAY_TMNCODE,
                "vnp_Amount": int(transaction.amount * 100),  # VNPay yêu cầu nhân 100
                "vnp_CurrCode": "VND",
                "vnp_TxnRef": str(int(transaction.id)),
                "vnp_OrderInfo": f"Thanh toan giao dich {transaction.id}",
                "vnp_OrderType": "other",
                "vnp_Locale": "vn",
                "vnp_ReturnUrl": VNPAY_RETURN_URL,
                "vnp_IpAddr": request.META.get("REMOTE_ADDR", "127.0.0.1"),
                "vnp_BankCode":"vnp_BankCode=VNBANK",
                "vnp_CreateDate": now.strftime('%Y%m%d%H%M%S'),
                "vnp_ExpireDate": expire_date.strftime('%Y%m%d%H%M%S')
            }
            #  Sắp xếp tham số theo thứ tự alphabet
            sorted_params = sorted(vnp_params.items())

            # Không encode khi tạo chữ ký
            sign_data = "&".join(f"{key}={value}" for key, value in sorted_params)

            # Encode URL khi gửi
            query_string = "&".join(f"{key}={urllib.parse.quote(str(value), safe='')}" for key, value in sorted_params)

            # Tạo chữ ký SHA-256
            hmac_hash = hmac.new(
            VNPAY_SECRET_KEY.encode('utf-8'),
            sign_data.encode('utf-8'),
            hashlib.sha512  # Dùng SHA-256 thay vì SHA-512
            ).hexdigest().upper()

            # Tạo URL thanh toán VNPay
            vnp_url = f"{VNPAY_URL}?{query_string}&vnp_SecureHash={hmac_hash}"

            return Response({"payment_url": vnp_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VNPayReturnAPIView(APIView):
    """Xử lý kết quả thanh toán từ VNPay"""

    def get(self, request):
        vnp_response = request.query_params
        vnp_txn_ref = vnp_response.get("vnp_TxnRef")  # Mã giao dịch của mình
        vnp_response_code = vnp_response.get("vnp_ResponseCode")  # Mã phản hồi từ VNPay
        # Kiểm tra giao dịch có tồn tại không
        transaction = get_object_or_404(Transaction, id=vnp_txn_ref)

        if vnp_response_code == "00":  # Thanh toán thành công
            transaction.status = "success"
        else:
            transaction.status = "failed"
        
        transaction.save()

        return JsonResponse({"message": "Payment processed", "status": transaction.status})
