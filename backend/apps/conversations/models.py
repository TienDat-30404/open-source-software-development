from django.db import models
from apps.base_model.base_model import BaseModel
from apps.users.models import User
# Create your models here.
class Conversation(BaseModel):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_conversations')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_conversations')
    class Meta: 
        db_table = 'conversations'
class Room(BaseModel):
    name=models.CharField(max_length=255,unique=True)
    def __str__(self):
        return self.name
class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="messages")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:30]}..."