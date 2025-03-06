from django.db import models
from apps.users.models import User
from apps.conversations.models import Conversation
from apps.base_model.base_model import BaseModel

# Create your models here.
class Chat(BaseModel):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message_text = models.TextField()
    file_url = models.CharField(max_length=500, null=True, blank=True)
    
    class Meta:
        db_table = 'chats'