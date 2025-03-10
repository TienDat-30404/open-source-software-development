from rest_framework import serializers
from apps.artists.models import Artist
from apps.songs.models import Song

class ArtistSerializer(serializers.ModelSerializer):
    songs = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = '__all__'
        
    def get_songs(self, obj):
        return [
            {"id" : sa.song.id, "name" : sa.song.title}
            for sa in obj.artist_song.all()
        ]

