from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ListeningHistory
from .serializers import ListeningHistorySerializer
from apps.songs.models import Song
from django.utils import timezone
from ..utils.response import success_response,error_response
from apps.users.models import User
from django.shortcuts import get_object_or_404
class ListeningHistoryAPIView(APIView):
   #  permission_classes = [IsAuthenticated]
     
    def get(self, request):
        # user = request.user
        user=User.objects.first()
        histories = ListeningHistory.objects.filter(user=user).order_by('-played_at')
        serializer = ListeningHistorySerializer(histories, many=True)
        return success_response(data=serializer.data)
    
    def post(self, request):
        user = User.objects.first()  # test
        song_id = request.data.get('song_id')

        if not song_id:
            return error_response(message='Missing song_id', code=400)

        try:
            song = Song.objects.get(id=song_id)
        except Song.DoesNotExist:
            return error_response(message='Song not found', code=404)

        # Kiểm tra lịch sử đã tồn tại chưa
        history, created = ListeningHistory.objects.get_or_create(
            user=user,
            song=song,
            defaults={'played_at': timezone.now()}
        )

        if not created:
            # Nếu đã tồn tại, chỉ cập nhật thời gian played_at
            history.played_at = timezone.now()
            history.save()
            message = 'Listening history updated successfully'
            code = status.HTTP_200_OK
        else:
            message = 'Listening history created successfully'
            code = status.HTTP_201_CREATED

        serializer = ListeningHistorySerializer(history)
        return success_response(data=serializer.data, message=message, code=code)
   
    def delete(self, request):
        user = User.objects.first()
        history_id = request.data.get('id')  # truyền id trong body
        
        if history_id:
            # Xoá một lịch sử cụ thể
            history = get_object_or_404(ListeningHistory, id=history_id, user=user)
            history.delete()
            return success_response(message="Listening history deleted successfully.")
        else:
            # Xoá toàn bộ lịch sử nghe nhạc của user
            deleted_count, _ = ListeningHistory.objects.filter(user=user).delete()
            return success_response(message=f"Deleted {deleted_count} listening history records.")
