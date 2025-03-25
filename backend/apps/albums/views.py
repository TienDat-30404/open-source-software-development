from django.shortcuts import render
from rest_framework import viewsets
from .models import Album
import json
from rest_framework.decorators import action
from apps.songs.serializers import SongSerializer
from .serializers import AlbumSerializer
from rest_framework import status
from rest_framework.response import Response
import cloudinary.uploader
from apps.songs_album.models import SongAlbum
from apps.songs.models import Song
from apps.songs_album.models import SongAlbum
class AlbumViewSet(viewsets.ModelViewSet): 
    queryset = Album.objects.all().order_by('-created_at')
    serializer_class = AlbumSerializer
    def list(self, request, *args, **kwargs): 
        paginator = self.paginator
        paginator.page_size = 7
        queryset = self.get_queryset()
        page = paginator.paginate_queryset(queryset, request)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many = True)
        return Response({
            "albums" : serializer.data,
            "status" : 200
        }, status = status.HTTP_200_OK)
        
        
    def create(self, request, *args, **kwargs): 
        image_file = request.data.get("image")
        song_ids = request.data.get("song_ids", [])
        if isinstance(song_ids, str):
            try:
                song_ids = json.loads(song_ids)
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON format for song_ids"}, status=status.HTTP_400_BAD_REQUEST)
        
        image_url = None
        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        request.data["image"] = image_url
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_album = serializer.save()
        
        album_songs = [SongAlbum(album=saved_album, song_id=song_id) for song_id in song_ids]
        SongAlbum.objects.bulk_create(album_songs) 
        
        return Response({
            "album" : serializer.data,
            "status" : 201
        }, status=status.HTTP_201_CREATED)
        
        
    @action(detail=True, methods=["post"], url_path="add-song-to-album")
    def add_song_album(self, request, pk=None):
        album = self.get_object()
        song_id = request.data.get("song_id")

        if not song_id:
            return Response(
                {"error": "Lỗi khi thêm bài hát vào album"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            song = Song.objects.get(id=song_id)
            if SongAlbum.objects.filter(album=album, song=song).exists():
                return Response(
                    {"error": "Bài hát đã có trong album"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            song_album = SongAlbum.objects.create(album=album, song=song)
            song_serializer = SongSerializer(song)
            return Response(
                {
                    "message": "Thêm bài hát vào album thành công",
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
        url_path="remove-song-out-album/(?P<song_id>[^/.]+)",
    )
    def remove_song_out_album(self, request, pk=None, song_id=None):
        album = self.get_object()
        try:
            song_album = SongAlbum.objects.get(album=album, song_id=song_id)
            song_album.delete()
            return Response(
                {"message": "Xóa bài hát khỏi album thành công"},
                status=status.HTTP_200_OK,
            )

        except SongAlbum.DoesNotExist:
            return Response(
                {"error": "Bài hát không có trong album"},
                status=status.HTTP_404_NOT_FOUND,
            )

