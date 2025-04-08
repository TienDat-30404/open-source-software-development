# serializers.py
from rest_framework import serializers
from .models import Song
from apps.categories.models import Category
from apps.artists.models import Artist

from apps.artists.serializers import ArtistSerializer
from apps.categories.serializers import CategorySerializer

class SongSerializer(serializers.ModelSerializer):
    artists = serializers.SerializerMethodField()
 
    
    genre = CategorySerializer(read_only=True)
    # genre_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='genre', write_only=True)
    
    class Meta:
        model = Song
        fields = '__all__'
        
    def get_artists(self, obj):
        return [
            {"id": sa.artist.id, "name": sa.artist.name, "image" : sa.artist.image}
            for sa in obj.song_artist.all()
        ]