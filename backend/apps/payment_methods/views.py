from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import PaymentMethod
from .serializers import PaymentMethodSerializer

class PaymentMethodAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Chỉ cho phép user đã đăng nhập

    def get(self, request, pk=None):
        """Lấy danh sách hoặc chi tiết phương thức thanh toán"""
        if pk:
            payment_method = get_object_or_404(PaymentMethod, pk=pk)
            serializer = PaymentMethodSerializer(payment_method)
            return Response(serializer.data)
        payment_methods = PaymentMethod.objects.all()
        serializer = PaymentMethodSerializer(payment_methods, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Tạo phương thức thanh toán mới"""
        serializer = PaymentMethodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Cập nhật toàn bộ phương thức thanh toán"""
        payment_method = get_object_or_404(PaymentMethod, pk=pk)
        serializer = PaymentMethodSerializer(payment_method, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        """Xóa phương thức thanh toán"""
        payment_method = get_object_or_404(PaymentMethod, pk=pk)
        payment_method.delete()
        return Response({"message": "Payment method deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
