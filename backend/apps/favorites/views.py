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

class LikeSongAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, song_id):
        """API để like một bài hát"""
        song = get_object_or_404(Song, id=song_id)
        favorite, created = Favorite.objects.get_or_create(user=request.user, song=song)

        if created:
            return Response({"message": "Like bài hát thành công"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Bạn đã like bài hát này rồi"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, song_id):
        """API để unlike một bài hát"""
        song = get_object_or_404(Song, id=song_id)
        favorite = Favorite.objects.filter(user=request.user, song=song)

        if favorite.exists():
            favorite.delete()
            return Response({"message": "Unlike bài hát thành công"}, status=status.HTTP_200_OK)
        return Response({"message": "Bạn chưa like bài hát này"}, status=status.HTTP_400_BAD_REQUEST)
