from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Plan
from .serializers import PlanSerializer
from uuid import UUID
from .pagination import CustomPagination
import requests
from ..artists.models import Artist
import time 
from ..utils.response import success_response,error_response,check_is_admin
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
OLLAMA_URL = 'http://localhost:11434/api/generate'
class PlanAPIView(APIView):

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        elif self.request.method in ['POST', 'PUT', 'DELETE']:
            return [IsAuthenticated()]
        return []  
    
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
        # check_is_admin(request.user)
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED)
        return error_response(errors=serializer.errors)

    def patch(self, request, pk):
        """Cập nhật toàn bộ kế hoạch"""
        check_is_admin(request.user)
        plan = get_object_or_404(Plan, pk=pk)
        serializer = PlanSerializer(plan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)
        return error_response(errors=serializer.errors)
    def delete(self, request, pk):
        """Xóa một kế hoạch"""
        check_is_admin(request.user)
        plan = get_object_or_404(Plan, pk=pk)
        plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
 
class ChatOllamaPlan(APIView):
    def post(self, request):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Lấy toàn bộ các Plan hiện có
        plans_data = Plan.objects.all()
        
        # Tạo nội dung yêu cầu cho AI
        context = "DANH SÁCH GÓI:\n"
        for artist in plans_data:
         context += (
         f" Tên:{artist.name}, giá:{artist.price}, thời gian dùng:{artist.duration_days}\n"
    )   
        final_prompt = f"""
{context}
Dựa trên DANH SÁCH GÓI, trả lời ngắn gọn chính xác và nhanh nhất có thể cho câu hỏi {prompt}.
""" 

        # Gửi request tới Ollama server để nhận câu trả lời
        try:
            response = requests.post(OLLAMA_URL, json={
                "model": "gemma:2b",
                "prompt": final_prompt,
                "stream": False  # lấy luôn kết quả 1 lần
            })
            response.raise_for_status()
            data = response.json()
            ai_response = data.get('response', 'Không có phản hồi từ AI.')
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({
            "user_prompt": prompt,
            "ai_response": ai_response
        })
class ChatOllamaArtist(APIView):
    def post(self, request):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Lấy toàn bộ các Plan hiện có
        art_data = Artist.objects.all()
        
        # Tạo nội dung yêu cầu cho AI
        context = "DANH SÁCH NGHỆ SĨ:\n"
        for artist in art_data:
         context += (
         f" Tên:{artist.name}, Tiểu sử:{artist.bio}, Nơi ở:{artist.country}, Ngày sinh:{artist.date_of_birth}\n"
    )   

        final_prompt = f"""
{context}
Dựa trên DANH SÁCH NGHỆ SĨ, trả lời ngắn gọn chính xác và nhanh nhất có thể cho câu hỏi {prompt}.
""" 
        # Gửi request tới Ollama server để nhận câu trả lời
        try:
            response = requests.post(OLLAMA_URL, json={
                "model": "gemma:2b",
                "prompt": final_prompt,
                "stream": False  # lấy luôn kết quả 1 lần
            })
            response.raise_for_status()
            data = response.json()
            ai_response = data.get('response', 'Không có phản hồi từ AI.')
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({
            "user_prompt": prompt,
            "ai_response": ai_response
        })
