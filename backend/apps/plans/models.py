from django.db import models
from apps.base_model.base_model import BaseModel

# Create your models here.
class Plan(BaseModel):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    duration_days = models.IntegerField()
    def __str__(self):
        return self.name
    class Meta: 
        db_table = 'plans'