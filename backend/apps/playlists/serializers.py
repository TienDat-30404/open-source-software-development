from .models import Playlist 
from rest_framework import serializers
class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist 
        fields = '__all__'