from django.db import models
from apps.base_model.base_model import BaseModel
from apps.users.models import User
from apps.artists.models import Artist

# Create your models here.
class Follow(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'follows'