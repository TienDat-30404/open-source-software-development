from django.db import models
from apps.base_model.base_model import BaseModel
from apps.users.models import User
from apps.songs.models import Song
# Create your models here.
class Favorite(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'favorites'