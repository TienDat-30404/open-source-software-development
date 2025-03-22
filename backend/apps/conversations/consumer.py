import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Room, Message,User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """Kết nối WebSocket dựa trên room_name"""
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Thêm vào nhóm để broadcast tin nhắn
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
    async def disconnect(self, close_code):
        """Ngắt kết nối WebSocket"""
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        """Nhận tin nhắn từ WebSocket"""
        data = json.loads(text_data)
        message = data['message']
        username = data['username']

        # Lưu tin nhắn vào database
        user = await sync_to_async(User.objects.get)(username=username)
        room = await sync_to_async(Room.objects.get)(name=self.room_name)
        await sync_to_async(Message.objects.create)(room=room, user=user, content=message)

        # Gửi tin nhắn đến nhóm WebSocket
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "username": username
            }
        )

    async def chat_message(self, event):
        """Gửi tin nhắn đến client"""
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "username": event["username"]
        }))
