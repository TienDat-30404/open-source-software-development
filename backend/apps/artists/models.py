from django.db import models
from apps.base_model.base_model import BaseModel

# Create your models here.
class Artist(BaseModel):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    country = models.CharField(max_length=100)
    date_of_birth = models.DateField(blank=True, null=True)
    image = models.CharField(max_length=255, null=True, blank=True)
    def __str__(self):
        return self.name
    
    class Meta: 
        db_table = 'artists'