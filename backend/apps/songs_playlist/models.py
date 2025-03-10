from django.db import models
from apps.base_model.base_model import BaseModel
from apps.songs.models import Song
from apps.playlists.models import Playlist
# Create your models here.
class SongPlayList(BaseModel):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    
   
    class Meta:
        db_table = 'songs_playlist'