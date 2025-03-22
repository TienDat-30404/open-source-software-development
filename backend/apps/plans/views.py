from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Plan
from .serializers import PlanSerializer
from uuid import UUID
from ..utils.response import success_response,error_response
class PlanAPIView(APIView):
    # permission_classes = [IsAuthenticated]  # Yêu cầu người dùng phải đăng nhập

    def get(self, request, pk=None):
        """Lấy danh sách hoặc chi tiết một kế hoạch"""
        if pk:
            print(type(pk)) 
            plan = get_object_or_404(Plan, pk=pk)
            serializer = PlanSerializer(plan)
            return success_response(data=serializer.data)
        plans = Plan.objects.all()
        serializer = PlanSerializer(plans, many=True)
        return success_response(data=serializer.data)

    def post(self, request):
        """Tạo một kế hoạch mới"""
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED)
        return error_response(errors=serializer.errors)

    def put(self, request, pk):
        """Cập nhật toàn bộ kế hoạch"""
        plan = get_object_or_404(Plan, pk=pk)
        serializer = PlanSerializer(plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)
        return error_response(errors=serializer.errors)
    def delete(self, request, pk):
        """Xóa một kế hoạch"""
        plan = get_object_or_404(Plan, pk=pk)
        plan.delete()
        return success_response(message="xóa kế hoạch thành công ",code=status.HTTP_204_NO_CONTENT)
