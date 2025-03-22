from django.shortcuts import render
from rest_framework import viewsets
from .models import Artist
from .serializers import ArtistSerializer
from rest_framework import status
from rest_framework.response import Response
import cloudinary.uploader


class ArtistViewSet(viewsets.ModelViewSet): 
    queryset = Artist.objects.all().order_by('-created_at')
    serializer_class = ArtistSerializer
    
    def list(self, request, *args, **kwargs): 
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
    
        serializer = self.get_serializer(queryset, many = True)
        return Response({
            "artists" : serializer.data,
            "status" : 200
        }, status = status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        image_file = request.data.get("image")
        image_url = None
        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        request.data["image"] = image_url
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({
            "artist" : serializer.data,
            "status" : 201
        }, status=status.HTTP_201_CREATED)
        
    def update(self, request, *args, **kwargs):
        artist = self.get_object()  
        image_file = request.data.get("image")
        image_url = None 
        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        request.data['image'] = image_url 
        serializer = self.get_serializer(artist, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "artist": serializer.data,
                "status": 200},
            status=status.HTTP_200_OK
        )