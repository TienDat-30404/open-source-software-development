from django.shortcuts import render
from rest_framework import viewsets
from .models import Category
from .serializers import CategorySerializer
from rest_framework import status
from rest_framework.response import Response
class CategoryViewSet(viewsets.ModelViewSet): 
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    def list(self, request, *args, **kwargs): 
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many = True)
        return Response({
            "categories" : serializer.data,
            "status" : 200
        }, status = status.HTTP_200_OK)
