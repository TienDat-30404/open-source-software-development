from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Plan
from .serializers import PlanSerializer
from uuid import UUID
from .pagination import CustomPagination
from ..utils.response import success_response,error_response,check_is_admin
class PlanAPIView(APIView):

    def get(self, request, pk=None):
        """Lấy danh sách hoặc chi tiết một kế hoạch"""
        if pk:
            print(type(pk)) 
            plan = get_object_or_404(Plan, pk=pk)
            serializer = PlanSerializer(plan)
            return success_response(data=serializer.data)
        plans = Plan.objects.all()
        paginator = CustomPagination()  # tạo bộ phân trang
        paginated_plans = paginator.paginate_queryset(plans, request)  # phân trang theo request
        serializer = PlanSerializer(paginated_plans, many=True)  # serialize danh sách đã phân trang
        return paginator.get_paginated_response(serializer.data) 

    def post(self, request):
        """Tạo một kế hoạch mới"""
        check_is_admin(request.user)
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED)
        return error_response(errors=serializer.errors)

    def put(self, request, pk):
        """Cập nhật toàn bộ kế hoạch"""
        check_is_admin(request.user)
        plan = get_object_or_404(Plan, pk=pk)
        serializer = PlanSerializer(plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)
        return error_response(errors=serializer.errors)
    def delete(self, request, pk):
        """Xóa một kế hoạch"""
        check_is_admin(request.user)
        plan = get_object_or_404(Plan, pk=pk)
        plan.delete()
        return success_response(message="xóa kế hoạch thành công ",code=status.HTTP_204_NO_CONTENT)
