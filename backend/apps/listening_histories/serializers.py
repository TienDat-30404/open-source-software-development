# apps/history/serializers.py

from rest_framework import serializers
from .models import ListeningHistory
from apps.songs.models import Song
from apps.songs.serializers import SongSerializer

class ListeningHistorySerializer(serializers.ModelSerializer):
    song = SongSerializer()

    class Meta:
        model = ListeningHistory
        fields = ['id', 'song', 'played_at']
