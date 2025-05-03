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
from apps.songs_artist.models import SongArtist
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from mutagen import File
import google.generativeai as genai
import os
import redis
from django.http import HttpResponse
import time
import math
# redis_client = redis.StrictRedis(
#     host="localhost", port=6379, db=0, decode_responses=True
# )
redis_client = redis.StrictRedis(
    host=os.getenv("REDIS_HOST"),
    port=int(os.getenv("REDIS_PORT")),
    db=0,
    decode_responses=True
)


class SongViewSet(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all().order_by("-created_at")

    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']: 
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def list(self, request, *args, **kwargs):
        search = request.query_params.get("search", None)
        size = request.query_params.get("size", None)

        queryset = self.get_queryset()
        if search:
            queryset = queryset.filter(title__icontains=search)

        if size is not None:
            try:
                size = int(size)
                if size <= 0:
                    size = 7
            except ValueError:
                return Response({"error": "Invalid page size"}, status=status.HTTP_400_BAD_REQUEST)

            self.paginator.page_size = size
            page = self.paginator.paginate_queryset(queryset, request)

            if page is not None:
                serializer = self.get_serializer(page, many=True)
                total_pages = math.ceil(self.paginator.page.paginator.count / self.paginator.page_size)
                return Response({
                    'results': serializer.data,
                    'count': self.paginator.page.paginator.count,
                    'total_pages': total_pages,
                    'next': self.paginator.get_next_link(),
                    'previous': self.paginator.get_previous_link(),
                    'status': 200
                }, status=status.HTTP_200_OK)
        
        # Nếu không có paginate
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'results': serializer.data,
            'count': len(serializer.data),
            'status': 200
        }, status=status.HTTP_200_OK)

            
       

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
                return Response(
                    {"error": "Invalid JSON format for artist_ids"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

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
                    return Response(
                        {"error": "Unsupported audio format"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # file_buffer.seek(0)
                upload_result = cloudinary.uploader.upload(
                    file_buffer, resource_type="auto"
                )

                audio_url = upload_result["secure_url"]
                request.data.pop("audio_url", None)
                request.data["duration"] = duration

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "No audio file provided"}, status=status.HTTP_400_BAD_REQUEST
            )
        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response(
                    {"error": f"Image upload failed: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        request.data["audio_url"] = audio_url
        request.data["image"] = image_url
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_song = serializer.save()

        song_artists = [
            SongArtist(song=saved_song, artist_id=artist_id) for artist_id in artist_ids
        ]
        SongArtist.objects.bulk_create(song_artists)

        return Response(
            {"song": serializer.data, "status": 201}, status=status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):
        song = self.get_object()
        artist_ids = request.data.get("artist_ids", [])
        if isinstance(artist_ids, str):
            try:
                artist_ids = json.loads(artist_ids)
            except json.JSONDecodeError:
                return Response(
                    {"error": "Invalid JSON format for artist_ids"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        audio_file = request.FILES.get("audio_url")
        image_file = request.FILES.get("image")

        audio_url = song.audio_url
        image_url = song.image
        duration = song.duration 
        if audio_file:
            try:
                file_buffer = io.BytesIO(audio_file.read())
                audio_info = File(file_buffer)
                if audio_info is not None and audio_info.info is not None:
                    duration = round(audio_info.info.length)
                else:
                    return Response(
                        {"error": "Unsupported audio format"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                audio_file.seek(0)
                    
                upload_result = cloudinary.uploader.upload(
                    audio_file, resource_type="auto"
                )
                audio_url = upload_result["secure_url"]
              
            except Exception as e:
                return Response(
                    {"error": f"Audio upload failed: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response(
                    {"error": f"Image upload failed: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        mutable_data = {
            **request.data.dict(),
            "audio_url": audio_url,
            "image": image_url,
            "duration": duration,
        }

        serializer = self.get_serializer(song, data=mutable_data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_song = serializer.save()

        if artist_ids:
            SongArtist.objects.filter(song=updated_song).delete()
            song_artists = [SongArtist(song=updated_song, artist_id=artist_id) for artist_id in artist_ids]
            SongArtist.objects.bulk_create(song_artists)

        return Response(
            {"song": serializer.data, "status": 200}, status=status.HTTP_200_OK
        )

    @action(detail=False, methods=["post"], url_path="suggest-songs-ai")
    def suggest_songs_ai(self, request):
        user_id = request.data.get("user", None)
        query = request.data.get("query", None)
        if not query:
            return Response(
                {"error": "Missing query parameter."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Cấu hình Gemini với API Key
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            cached_suggestions = redis_client.get(f"suggest_songs:{query}")
            if cached_suggestions:
                # Nếu có lịch sử gợi ý, trả lại từ Redis
                print("cached_suggestions", cached_suggestions)
                return Response(
                    {
                        "suggestions": cached_suggestions.split("\n"),
                        "status": status.HTTP_200_OK,
                    }
                )

            # Khởi tạo model
            model = genai.GenerativeModel("gemini-1.5-pro")
            # Prompt để AI hiểu đúng yêu cầu
            prompt = f"Suggest 5 popular or interesting song titles that match this theme or keyword: '{query}'"

            # Gọi AI trả lời
            response = model.generate_content(prompt)

            suggestions = response.text.strip().split("\n")
            timestamp = int(time.time())
            redis_client.setex(
                f"{user_id}*****{query}*****{timestamp}", 3000, "\n".join(suggestions)
            )
            return Response({"suggestions": suggestions, "status": status.HTTP_200_OK})

        except Exception as e:
            print("e" ,e)
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
            
            
    @action(detail=False, methods=["get"], url_path="get-history-chat-ai")
    def get_history_chat_ai(self, request):
        user_id = request.query_params.get("user", None)
        if not user_id:
            return Response(
                {"error": "Not user_id for query params"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
           
            keys = redis_client.keys(f"{user_id}*****")
            sorted_keys = sorted(
                keys,
                key=lambda k: int(k.split('*****')[2]), 
                reverse=False  
            )
            historys_chat = []
            for key in sorted_keys:    
                content = redis_client.get(key)
                if content:  # Kiểm tra nếu có nội dung trả về từ Redis
                    key_parts = key.split('*****')
                    if len(key_parts) > 2:
                        key_search = key_parts[1]
                    else:
                        key_search = None
                    historys_chat.append({
                        "key_search": key_search,
                        "content": content  # Decoding từ byte sang string nếu cần
                        
                    })
            return Response({
                'data' : historys_chat
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)