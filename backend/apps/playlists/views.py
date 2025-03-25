from django.shortcuts import render
from rest_framework import viewsets
from .models import Playlist
from rest_framework.decorators import action
from apps.songs.models import Song
from apps.songs_playlist.models import SongPlayList
from .serializers import PlaylistSerializer
from rest_framework import status
from rest_framework.response import Response
from apps.songs.serializers import SongSerializer
import cloudinary.uploader
from rest_framework.pagination import PageNumberPagination

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all().order_by("created_at")
    serializer_class = PlaylistSerializer
    pagination_class = PageNumberPagination
    def list(self, request, *args, **kwargs):
        user_id = request.query_params.get("user_id")
        title = request.query_params.get("title")
     
        
        queryset = self.get_queryset().filter(user_id=user_id)
        queryset = self.get_queryset()

        if title:
            queryset = queryset.filter(title__icontains=title)
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {"playlists": serializer.data, "status": 200}, status=status.HTTP_200_OK
        )
        
        
    def update(self, request, *args, **kwargs):
        playlist = self.get_object()  
        image_file = request.data.get("image")
        image_url = playlist.image
        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            
        mutable_data = {**request.data.dict(), "image": image_url}
        serializer = self.get_serializer(playlist, data=mutable_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "playlist": serializer.data,
                "status": 200},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=["post"], url_path="add-song-to-playlist")
    def add_song_playlist(self, request, pk=None):
        playlist = self.get_object()
        song_id = request.data.get("song_id")

        if not song_id:
            return Response(
                {"error": "Lỗi khi thêm bài hát vào playlist của bạn"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            song = Song.objects.get(id=song_id)
            if SongPlayList.objects.filter(playlist=playlist, song=song).exists():
                return Response(
                    {"error": "Bài hát đã có trong playlist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            song_playlist = SongPlayList.objects.create(playlist=playlist, song=song)
            song_serializer = SongSerializer(song)
            return Response(
                {
                    "message": "Thêm bài hát vào playlist thành công",
                    "song": song_serializer.data,
                    "status" : 200
                },status=status.HTTP_201_CREATED,)

        except Song.DoesNotExist:
            return Response(
                {"error": "Bài hát không tồn tại"}, status=status.HTTP_404_NOT_FOUND
            )

    @action(
        detail=True,
        methods=["delete"],
        url_path="remove-song-out-playlist/(?P<song_id>[^/.]+)",
    )
    def remove_song_out_playlist(self, request, pk=None, song_id=None):
        playlist = self.get_object()
        try:
            song_playlist = SongPlayList.objects.get(playlist=playlist, song_id=song_id)
            song_playlist.delete()
            return Response(
                {"message": "Xóa bài hát khỏi playlist thành công"},
                status=status.HTTP_200_OK,
            )

        except SongPlayList.DoesNotExist:
            return Response(
                {"error": "Bài hát không có trong playlist"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return Response({"message": "Xóa thành công"}, status=response.status_code)