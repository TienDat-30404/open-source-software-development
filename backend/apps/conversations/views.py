from django.shortcuts import render
from .models import Room
# Create your views here.


from rest_framework import status
from django.http import HttpResponse
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Room,Message
from .serializers import RoomSerializer,MessageSerializer
from ..utils.response import success_response,error_response,check_is_admin
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.exceptions import PermissionDenied

import time 
class RoomAPIView(APIView):
    def get(self, request, pk=None):
       
        """Lấy danh sách hoặc chi tiết một phòng"""
        if pk:
            room = get_object_or_404(Room, pk=pk)
            serializer = RoomSerializer(room)
            return success_response(data=serializer.data)
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return success_response(data=serializer.data)

    def post(self, request):
        """Tạo một phòng mới"""
        request.data['user'] = request.user.id
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data,code=status.HTTP_201_CREATED)
        return error_response(errors=serializer.errors,message=serializer.error_messages)

    def put(self, request, pk):
        """Cập nhật thông tin phòng"""
        room = get_object_or_404(Room, pk=pk)
        
        if room.user != request.user:
          raise PermissionDenied("Bạn không có quyền cập nhật phòng này.")

        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(data=serializer.data)
        return  error_response(errors=serializer.errors,message=serializer.error_messages)

    def delete(self, request, pk):
        
        """Xóa một phòng"""
        room = get_object_or_404(Room, pk=pk)
        if room.user != request.user:
          raise PermissionDenied("Bạn không có quyền cập nhật phòng này.")
        room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class RoomMessagesAPIView(APIView):
    def get(self, request, room_name):
        """Lấy tất cả tin nhắn trong một phòng dựa trên room_name"""
        room = get_object_or_404(Room, name=room_name)
        messages = Message.objects.filter(room=room).order_by("timestamp")
        serializer = MessageSerializer(messages, many=True)
        return success_response(data=serializer.data)