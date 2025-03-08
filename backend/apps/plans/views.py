from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Plan
from .serializers import PlanSerializer
from uuid import UUID
class PlanAPIView(APIView):
    # permission_classes = [IsAuthenticated]  # Yêu cầu người dùng phải đăng nhập

    def get(self, request, pk=None):
        """Lấy danh sách hoặc chi tiết một kế hoạch"""
        if pk:
            print(type(pk)) 
            plan = get_object_or_404(Plan, pk=pk)
            serializer = PlanSerializer(plan)
            return Response(serializer.data)
        plans = Plan.objects.all()
        serializer = PlanSerializer(plans, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Tạo một kế hoạch mới"""
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """Cập nhật toàn bộ kế hoạch"""
        plan = get_object_or_404(Plan, pk=pk)
        serializer = PlanSerializer(plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        """Xóa một kế hoạch"""
        plan = get_object_or_404(Plan, pk=pk)
        plan.delete()
        return Response({"message": "Plan deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
