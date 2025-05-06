# apps/history/serializers.py

from rest_framework import serializers
from .models import Favorite
from apps.songs.serializers import SongSerializer

class FavoriteSerial(serializers.ModelSerializer):
    song = SongSerializer()

    class Meta:
        model = Favorite
        fields = ['id', 'song']
