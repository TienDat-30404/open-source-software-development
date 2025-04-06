from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.favorites.models import Favorite
from apps.users.models import User
from apps.songs.models import Song
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from ..utils.response import success_response,error_response
from .serializers import FavoriteSerial
class LikeSongAPIView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        user=User.objects.first()
        favorite = Favorite.objects.filter(user=user)
        serializer = FavoriteSerial(favorite, many=True)
        return success_response(data=serializer.data)
    def post(self, request):
        """API để like một bài hát"""
        user=User.objects.first()
        song_id = request.data.get('song_id')
        song = get_object_or_404(Song, id=song_id)
        favorite, created = Favorite.objects.get_or_create(user=user, song=song)

        if created:
            return success_response(message= "Like bài hát thành công",code=status.HTTP_201_CREATED)
        return error_response(message="Bạn đã like bài hát này rồi")
    def delete(self, request):
        """API để unlike một bài hát"""
        user=User.objects.first()
        song_id = request.data.get('song_id')
        song = get_object_or_404(Song, id=song_id)
        favorite = Favorite.objects.filter(user=user, song=song)

        if favorite.exists():
            favorite.delete()
            return success_response(message="Unlike bài hát thành công")
        return error_response(message="Bạn chưa like bài hát này")
