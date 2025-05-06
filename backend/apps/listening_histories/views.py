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
from rest_framework.decorators import action
from django.db.models import Sum
from apps.songs.serializers import SongSerializer
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination

class ListeningHistoryAPIView(APIView):
   #  permission_classes = [IsAuthenticated]
     
    def get(self, request):
        user = request.user
        histories = ListeningHistory.objects.filter(user=user).order_by('-played_at')
        serializer = ListeningHistorySerializer(histories, many=True)
        return success_response(data=serializer.data)
    
    def post(self, request):
        user = request.user
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
        
    def patch(self, request):
        user = request.user
        song_id = request.data.get('song_id')  # truyền song_id trong body

        if not song_id:
            return error_response(message='Missing song_id', code=400)

        try:
            history = ListeningHistory.objects.get(song_id=song_id, user=user)
        except ListeningHistory.DoesNotExist:
            return error_response(message='Listening history not found', code=404)

        # Tăng lượt nghe lên 1
        history.count += 1
        history.save()

        serializer = ListeningHistorySerializer(history)
        return success_response(data=serializer.data, message="Listening count updated successfully.")



class TopSongsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        top_limit = request.query_params.get('limit', 10)
        try:
            top_limit = int(top_limit)
        except ValueError:
            return error_response(message='Invalid limit parameter', code=400)

        # Lấy danh sách bài hát được nghe nhiều nhất
        top_songs = (
            ListeningHistory.objects.values('song')
            .annotate(total_count=Sum('count'))
            .order_by('-total_count')[:top_limit]
        )

        # Trích xuất song_ids và lấy thông tin bài hát từ cơ sở dữ liệu
        song_ids = [entry['song'] for entry in top_songs]
        songs = Song.objects.filter(id__in=song_ids)
        song_data = {song.id: song for song in songs}

        # Kết hợp dữ liệu bài hát với tổng số lượt nghe
        result = [
            {
                'song': SongSerializer(song_data[entry['song']]).data,
                'total_count': entry['total_count'],
            }
            for entry in top_songs
            if entry['song'] in song_data
        ]

        # Phân trang
        paginator = PageNumberPagination()
        paginator.page_size = request.query_params.get('size', 10)  # Số lượng phần tử trên mỗi trang
        page = paginator.paginate_queryset(result, request)

        if page is not None:
            # Trả về kết quả phân trang
            return paginator.get_paginated_response(page)

        # Nếu không phân trang, trả về tất cả kết quả
        return success_response(data=result, message="Top songs retrieved successfully.")