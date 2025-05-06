from django.db import models
from apps.users.models import User
from apps.songs.models import Song
from apps.base_model.base_model import BaseModel

# Create your models here.
class ListeningHistory(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    played_at = models.DateTimeField()
    count = models.PositiveIntegerField(default=1)
    
    class Meta:
        db_table = 'listening_histories'