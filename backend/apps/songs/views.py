from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Song
from rest_framework.decorators import action
from .serializers import SongSerializer

from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny 
from rest_framework.decorators import action

class SongViewSet(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all().order_by('-created_at')
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # name = request.query_params.get('name', None)

        # if name:
        #     queryset = queryset.filter(name__icontains=name)

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "songs": serializer.data, 
            "status": status.HTTP_200_OK,
            "method" : request.method,
            }, status=status.HTTP_200_OK)
    
    # def create(self, request, *args, **kwargs):
    #     return super().create(request, *args, **kwargs)

    # def update(self, request, *args, **kwargs):
    #     return super().update(request, *args, **kwargs)

    # def destroy(self, request, *args, **kwargs):
    #     return super().destroy(request, *args, **kwargs)
    
    # @action(detail=False, methods=['get']) #  url_path='change-password', url_name='change_password'
    # def filter_by_name(self, request):
    #     name = request.query_params.get('name', None)
    #     if name:
    #         queryset = self.get_queryset().filter(name__icontains=name)
    #     else:
    #         queryset = self.get_queryset()

    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response({"categories": serializer.data}, status=status.HTTP_200_OK)



