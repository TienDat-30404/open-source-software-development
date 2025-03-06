from django.db import models
from apps.base_model.base_model import BaseModel

# Create your models here.
class Category(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'categories'