from .models import Album 
from rest_framework import serializers
from django.db import connection
from apps.songs_artist.models import SongArtist
from apps.songs.serializers import SongSerializer
from django.db import reset_queries
from apps.songs.serializers import SongSerializer
class AlbumSerializer(serializers.ModelSerializer):
    songs = serializers.SerializerMethodField()
    class Meta:
        model = Album 
        fields = '__all__'
        

    def get_songs(self, obj):
        songs = [sa.song for sa in obj.album_song.all()]
        return SongSerializer(songs, many=True).data
       

