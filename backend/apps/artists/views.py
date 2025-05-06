from django.shortcuts import render
from rest_framework import viewsets
from .models import Artist
from .serializers import ArtistSerializer
from rest_framework import status
from rest_framework.response import Response
import cloudinary.uploader
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

import math

class ArtistViewSet(viewsets.ModelViewSet): 
    queryset = Artist.objects.all().order_by('-created_at')
    serializer_class = ArtistSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:  # Cho phép list và retrieve không cần đăng nhập
            return [AllowAny()]
        return [IsAuthenticated()]

    
    def list(self, request, *args, **kwargs): 
        paginator = self.paginator
        
        size = request.query_params.get('size', None)
        paginate = False
        if size is not None:
            try:
                paginate = True
                size = int(size)
                if size > 0:
                    paginator.page_size = size
                else:
                    paginator.page_size = 5 
            except ValueError:
                return Response({"error": "Invalid page size"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            paginator.page_size = 5 
        
        queryset = self.get_queryset()
        
        if paginate:
            page = paginator.paginate_queryset(queryset, request)
            serializer = self.get_serializer(page, many=True)
            total_pages = math.ceil(paginator.page.paginator.count / paginator.page_size)

            return Response({
                'results': serializer.data,
                'count': paginator.page.paginator.count,
                'total_pages': total_pages,
                'next': paginator.get_next_link(),
                'previous': paginator.get_previous_link(),
                'status': 200
            }, status=status.HTTP_200_OK)
        else:
            serializer = self.get_serializer(queryset, many=True)
            return Response({
                'results': serializer.data,
                'count': len(serializer.data),
                'total_pages': 1,
                'status': 200
            }, status=status.HTTP_200_OK)

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
        data = request.data.copy()
        image_file = request.data.get("image")
        if image_file:
            try:
                upload_result = cloudinary.uploader.upload(image_file)
                image_url = upload_result["secure_url"]
                data["image"] = image_url
            except Exception as e:
                return Response({"error": f"Image upload failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            data.pop("image", None)
             
        serializer = self.get_serializer(artist, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "artist": serializer.data,
                "status": 200},
            status=status.HTTP_200_OK
        )