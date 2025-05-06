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
            {
                "id" : sa.song.id,
                "title" : sa.song.title,
                "created_at" : sa.song.created_at,
                "updated_at" : sa.song.updated_at,
                "deleted_at" : sa.song.deleted_at,
                "duration" : sa.song.duration,
                "release_date" : sa.song.release_date,
                "audio_url" : sa.song.audio_url,
                "video_url" : sa.song.video_url,
                "image" : sa.song.image
                
            }
            for sa in obj.artist_song.all()
        ]

