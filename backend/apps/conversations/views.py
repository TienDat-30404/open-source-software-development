from django.shortcuts import render
from .models import Room
# Create your views here.


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Room,Message
from .serializers import RoomSerializer,MessageSerializer

class RoomAPIView(APIView):
    # permission_classes = [IsAuthenticated]  # Bật nếu cần yêu cầu đăng nhập

    def get(self, request, slug=None):
        """Lấy danh sách hoặc chi tiết một phòng"""
        if slug:
            room = get_object_or_404(Room, slug=slug)
            serializer = RoomSerializer(room)
            return Response(serializer.data)
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Tạo một phòng mới"""
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug):
        """Cập nhật thông tin phòng"""
        room = get_object_or_404(Room, slug=slug)
        serializer = RoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        """Xóa một phòng"""
        room = get_object_or_404(Room, slug=slug)
        room.delete()
        return Response({"message": "Room deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class RoomMessagesAPIView(APIView):
    def get(self, request, room_name):
        """Lấy tất cả tin nhắn trong một phòng dựa trên room_name"""
        room = get_object_or_404(Room, name=room_name)
        messages = Message.objects.filter(room=room).order_by("timestamp")
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)