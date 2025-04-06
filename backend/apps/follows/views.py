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
from ..utils.response import success_response,error_response
from .serializers import FollowSerializer
class FollowArtistAPIView(APIView):
    # permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user=User.objects.first()
        follows = Follow.objects.filter(user=user)
        serializer = FollowSerializer(follows, many=True)
        return success_response(data=serializer.data)
    def post(self, request):
        """API để follow một nghệ sĩ"""
        artist_id = request.data.get('artist_id')
        artist = get_object_or_404(Artist, id=artist_id)
        user=User.objects.first()
        follow, created = Follow.objects.get_or_create(user=user, artist=artist)
        
        if created:
            return success_response(message="theo dõi nghệ sĩ thành công",code=status.HTTP_201_CREATED)
        return error_response(message="bạn đã theo dõi nghệ sĩ này rồi ")
    
    def delete(self, request):
        """API để unfollow một nghệ sĩ"""
        artist_id = request.data.get('artist_id')
        artist = get_object_or_404(Artist, id=artist_id)
        user=User.objects.first()
        follow = Follow.objects.filter(user=user, artist=artist)
        
        if follow.exists():
            follow.delete()
            return success_response(message="hủy theo dõi nghệ sĩ thành công",code=status.HTTP_204_NO_CONTENT)
        return error_response(message="Bạn chưa follow nghệ sĩ này")
