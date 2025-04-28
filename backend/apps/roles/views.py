from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Role
from .serializers import RoleSerializer
from ..utils.response import success_response,error_response,check_is_admin
class RoleAPIView(APIView):

    def get(self, request, pk=None):
        
        if pk:
            role = get_object_or_404(Role, pk=pk)
            serializer = RoleSerializer(role)
            return success_response(data=serializer.data)
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return success_response(data=serializer.data)

    def post(self, request):
        """Tạo phương thức thanh toán mới"""
        check_is_admin(request.user)
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED)
        return error_response(errors=serializer.errors)

    def patch(self, request, pk):
        """Cập nhật toàn bộ phương thức thanh toán"""
        check_is_admin(request.user)
        payment_method = get_object_or_404(Role, pk=pk)
        serializer = RoleSerializer(payment_method, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)
        return error_response(errors=serializer.errors)
    def delete(self, request, pk):
        """Xóa phương thức thanh toán"""
        check_is_admin(request.user)
        payment_method = get_object_or_404(Role, pk=pk)
        payment_method.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
