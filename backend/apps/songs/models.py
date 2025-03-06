from django.db import models
from apps.base_model.base_model import BaseModel
from apps.artists.models import Artist
from apps.albums.models import Album
# Create your models here.
class Song(BaseModel):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.SET_NULL, null=True)
    duration = models.IntegerField()
    genre = models.CharField(max_length=100)
    release_date = models.DateField()
    audio_url = models.CharField(max_length=500)
    
    class Meta : 
        db_table = 'songs'