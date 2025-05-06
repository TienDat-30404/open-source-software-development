from django.db import models
from apps.artists.models import Artist
from apps.base_model.base_model import BaseModel
# Create your models here.
class Album(BaseModel):
    title = models.CharField(max_length=255)
    release_date = models.DateField()
    image = models.CharField(max_length=500)
    
    def __str__(self):
        return self.title
    
    class Meta: 
        db_table = 'albums'