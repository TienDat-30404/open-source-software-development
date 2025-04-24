from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import PaymentMethod
from .serializers import PaymentMethodSerializer
from ..utils.response import success_response,error_response,check_is_admin
class PaymentMethodAPIView(APIView):
    def get(self, request, pk=None):
        """Lấy danh sách hoặc chi tiết phương thức thanh toán"""
        
        if pk:
            payment_method = get_object_or_404(PaymentMethod, pk=pk)
            serializer = PaymentMethodSerializer(payment_method)
            return success_response(data=serializer.data)
        payment_methods = PaymentMethod.objects.all()
        serializer = PaymentMethodSerializer(payment_methods, many=True)
        return success_response(data=serializer.data)

    def post(self, request):
        """Tạo phương thức thanh toán mới"""
        check_is_admin(request.user)
        serializer = PaymentMethodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED)
        return error_response(errors=serializer.errors)

    def put(self, request, pk):
        """Cập nhật toàn bộ phương thức thanh toán"""
        check_is_admin(request.user)
        payment_method = get_object_or_404(PaymentMethod, pk=pk)
        serializer = PaymentMethodSerializer(payment_method, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)
        return error_response(errors=serializer.errors)
    def delete(self, request, pk):
        """Xóa phương thức thanh toán"""
        check_is_admin(request.user)
        payment_method = get_object_or_404(PaymentMethod, pk=pk)
        payment_method.delete()
        return success_response(message="delete payment_method success",code=status.HTTP_204_NO_CONTENT)
