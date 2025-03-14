from django.shortcuts import render
import cloudinary.uploader
import io
import json
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Song
from rest_framework.decorators import action
from .serializers import SongSerializer
from apps.artists.models import Artist
from apps.songs_artist.models import SongArtist
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from mutagen import File  

class SongViewSet(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all().order_by("-created_at")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "songs": serializer.data,
                "status": status.HTTP_200_OK,
                "method": request.method,
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"], url_path="by-artist/(?P<artist_id>[^/.]+)")
    def by_artist(self, request, artist_id=None):
        songs = Song.objects.filter(artist__id=artist_id).order_by("-created_at")
        serializer = self.get_serializer(songs, many=True)
        return Response(
            {"songs": serializer.data, "status": status.HTTP_200_OK},
            status=status.HTTP_200_OK,
        )
    def create(self, request, *args, **kwargs):
        artist_ids = request.data.get("artist_ids", [])
        if isinstance(artist_ids, str):
            try:
                artist_ids = json.loads(artist_ids)
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON format for artist_ids"}, status=status.HTTP_400_BAD_REQUEST)

        audio_file = request.FILES.get("audio_url")  
        image_file = request.FILES.get("image")
        audio_url = None
        image_url = None
        if audio_file:
            try:
                audio_file.open()
                file_buffer = io.BytesIO(audio_file.read())
                # file_buffer.seek(0)

                audio_info = File(file_buffer)
                if audio_info is not None and audio_info.info is not None:
                    duration = round(audio_info.info.length)  # Độ dài (tính bằng giây)
                else:
                    return Response({"error": "Unsupported audio format"}, status=status.HTTP_400_BAD_REQUEST)
                
                # file_buffer.seek(0)
                upload_result = cloudinary.uploader.upload(file_buffer, resource_type="auto")
                
                audio_url = upload_result["secure_url"]
                request.data.pop("audio_url", None)
                request.data["duration"] = duration

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No audio file provided"}, status=status.HTTP_400_BAD_REQUEST)
        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            
        request.data["audio_url"] = audio_url
        request.data["image"] = image_url
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_song = serializer.save()

        song_artists = [SongArtist(song=saved_song, artist_id=artist_id) for artist_id in artist_ids]
        SongArtist.objects.bulk_create(song_artists)  

        return Response(
            {
                "song": serializer.data,
                "status": 201}, 
            status=status.HTTP_201_CREATED
        )
        
    def update(self, request, *args, **kwargs):
        song = self.get_object()  
        artist_ids = request.data.get("artist_ids", [])
        if isinstance(artist_ids, str):
            try:
                artist_ids = json.loads(artist_ids)
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON format for artist_ids"}, status=status.HTTP_400_BAD_REQUEST)

        audio_file = request.FILES.get("audio_url")
        image_file = request.FILES.get("image")

        audio_url = song.audio_url  
        image_url = song.image  
        

        if audio_file:
            try:
                upload_result = cloudinary.uploader.upload(audio_file, resource_type="auto")
                audio_url = upload_result["secure_url"]
            except Exception as e:
                return Response({"error": f"Audio upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        mutable_data = {**request.data.dict(), "audio_url": audio_url, "image": image_url}



        serializer = self.get_serializer(song, data=mutable_data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_song = serializer.save()

        if artist_ids:
            song.songartist_set.all().delete() 
            song_artists = [SongArtist(song=updated_song, artist_id=artist_id) for artist_id in artist_ids]
            SongArtist.objects.bulk_create(song_artists)

        return Response(
            {
                "song": serializer.data,
                "status": 200},
            status=status.HTTP_200_OK
        )

    