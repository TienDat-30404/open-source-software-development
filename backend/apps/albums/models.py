from django.db import models
from apps.artists.models import Artist
from apps.base_model.base_model import BaseModel
# Create your models here.
class Album(BaseModel):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    release_date = models.DateField()
    image = models.CharField(max_length=500)
    
    class Meta: 
        db_table = 'albums'