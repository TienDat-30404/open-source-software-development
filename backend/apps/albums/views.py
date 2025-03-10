from django.shortcuts import render
from rest_framework import viewsets
from .models import Album
from .serializers import AlbumSerializer
from rest_framework import status
from rest_framework.response import Response
class AlbumViewSet(viewsets.ModelViewSet): 
    queryset = Album.objects.all().order_by('-created_at')
    serializer_class = AlbumSerializer
    def list(self, request, *args, **kwargs): 
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many = True)
        return Response({
            "albums" : serializer.data,
            "status" : 200
        }, status = status.HTTP_200_OK)
