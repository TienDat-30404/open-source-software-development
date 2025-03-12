from django.db import models
from apps.base_model.base_model import BaseModel
from apps.albums.models import Album
from apps.songs.models import Song
# Create your models here.
class SongAlbum(BaseModel):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="album_song")
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    
   
    class Meta:
        db_table = 'songs_album'