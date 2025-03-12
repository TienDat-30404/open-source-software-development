from django.db import models
from apps.base_model.base_model import BaseModel
from apps.artists.models import Artist
from apps.songs.models import Song
# Create your models here.
class SongArtist(BaseModel):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name="artist_song")
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="song_artist")
    
   
    class Meta:
        db_table = 'songs_artist'