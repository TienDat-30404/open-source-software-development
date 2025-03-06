from django.db import models
from apps.base_model.base_model import BaseModel

# Create your models here.
class PaymentMethod(BaseModel):
    name = models.CharField(max_length=255)
    
    class Meta:
        db_table = 'payment_methods'