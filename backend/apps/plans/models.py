from django.db import models
from apps.base_model.base_model import BaseModel

# Create your models here.
class Plan(BaseModel):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    duration_days = models.IntegerField()
    def __str__(self):
        return self.name
    class Meta: 
        db_table = 'plans'

class QuestionHistory(models.Model):
    prompt = models.TextField(unique=True)
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    frequency = models.IntegerField(default=1)