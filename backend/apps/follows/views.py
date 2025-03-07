from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.follows.models import Follow
from apps.users.models import User
from apps.artists.models import Artist
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class FollowArtistAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, artist_id):
        """API để follow một nghệ sĩ"""
        artist = get_object_or_404(Artist, id=artist_id)
        follow, created = Follow.objects.get_or_create(user=request.user, artist=artist)
        
        if created:
            return Response({"message": "Follow thành công"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Bạn đã follow nghệ sĩ này rồi"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, artist_id):
        """API để unfollow một nghệ sĩ"""
        artist = get_object_or_404(Artist, id=artist_id)
        follow = Follow.objects.filter(user=request.user, artist=artist)
        
        if follow.exists():
            follow.delete()
            return Response({"message": "Unfollow thành công"}, status=status.HTTP_200_OK)
        return Response({"message": "Bạn chưa follow nghệ sĩ này"}, status=status.HTTP_400_BAD_REQUEST)
