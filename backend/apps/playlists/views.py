from django.shortcuts import render
from rest_framework import viewsets
from .models import Playlist
from .serializers import PlaylistSerializer
from rest_framework import status
from rest_framework.response import Response
class PlaylistViewSet(viewsets.ModelViewSet): 
    queryset = Playlist.objects.all().order_by('-created_at')
    serializer_class = PlaylistSerializer
    def list(self, request, *args, **kwargs): 
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many = True)
        return Response({
            "playlists" : serializer.data,
            "status" : 200
        }, status = status.HTTP_200_OK)
