from .models import Playlist 
from rest_framework import serializers
from apps.songs.serializers import SongSerializer
class PlaylistSerializer(serializers.ModelSerializer):
    songs = serializers.SerializerMethodField()

    class Meta:
        model = Playlist 
        fields = '__all__'
        
    def get_songs(self, obj):
        songs = [sa.song for sa in obj.playlist_song.all()]
        return SongSerializer(songs, many=True).data
    