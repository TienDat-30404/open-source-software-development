from django.db import models
from apps.base_model.base_model import BaseModel
from apps.users.models import User
from apps.plans.models import Plan
from apps.payment_methods.models import PaymentMethod
# Create your models here.
class Transaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta : 
        db_table = 'transactions'