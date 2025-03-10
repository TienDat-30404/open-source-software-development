from .models import Album 
from rest_framework import serializers
from apps.songs.serializers import SongSerializer
class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True, source="albums")
    class Meta:
        model = Album 
        fields = '__all__'