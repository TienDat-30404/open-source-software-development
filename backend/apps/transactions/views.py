from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Chỉ user đăng nhập mới truy cập

    def get(self, request, pk=None):
        """Lấy danh sách tất cả giao dịch của user hoặc chi tiết một giao dịch"""
        if pk:
            transaction = get_object_or_404(Transaction, pk=pk, user=request.user)  # Chỉ lấy giao dịch của user hiện tại
            serializer = TransactionSerializer(transaction)
            return Response(serializer.data)
        transactions = Transaction.objects.filter(user=request.user)  # Lọc theo user hiện tại
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    def post(self, request):
        """Tạo giao dịch mới"""
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Gán user hiện tại vào giao dịch
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
