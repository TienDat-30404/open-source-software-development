from django.db import models
from apps.base_model.base_model import BaseModel
from apps.artists.models import Artist
from apps.albums.models import Album

from apps.categories.models import Category
from apps.playlists.models import Playlist

from cloudinary_storage.storage import MediaCloudinaryStorage
# Create your models here.
class Song(BaseModel):
    title = models.CharField(max_length=255)
    genre = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    duration = models.IntegerField()
    release_date = models.DateField()
    image = models.CharField(max_length=255, null=True, blank=True)
    audio_url = models.URLField(blank=True, null=True)  
    video_url = models.URLField(blank=True, null=True)  

    
    def __str__(self):
        return self.title
    
    class Meta : 
        db_table = 'songs'

