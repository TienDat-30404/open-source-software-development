from rest_framework import serializers
from .models import Room,Message

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__' 
class MessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Message
        fields = ["id", "room", "username", "content", "timestamp"]
