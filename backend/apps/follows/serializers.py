# apps/history/serializers.py

from rest_framework import serializers
from .models import Follow
from apps.artists.models import Artist
from apps.artists.serializers import ArtistSerializer

class FollowSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()

    class Meta:
        model = Follow
        fields = ['id', 'artist']
