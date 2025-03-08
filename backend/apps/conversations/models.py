from django.db import models
from apps.base_model.base_model import BaseModel
from apps.users.models import User
# Create your models here.
class Conversation(BaseModel):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_conversations')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_conversations')
    
    class Meta: 
        db_table = 'conversations'
