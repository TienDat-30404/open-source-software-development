from django.db import models
from apps.base_model.base_model import BaseModel

# Create your models here.
class Role(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    
    class Meta: 
        db_table = 'roles'
    def __str__(self):
        return self.name