from django.db import models
from apps.base_model.base_model import BaseModel
from apps.users.models import User
# Create your models here.
class Playlist(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(max_length=255, null=True, blank=True)
    
    class Meta: 
        db_table = 'playlists'