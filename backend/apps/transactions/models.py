from django.db import models
from apps.base_model.base_model import BaseModel
from apps.users.models import User
from apps.plans.models import Plan
from apps.payment_methods.models import PaymentMethod
from django.utils.timezone import now, timedelta
# Create your models here.
class Subscription(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('canceled', 'Canceled'), ('expired', 'Expired')], default='active')
    auto_renew = models.BooleanField(default=False)

    def is_premium(self):
        return self.status == 'active' and self.end_date > now()

    def renew_subscription(self):
        """ Gia hạn gói nếu auto_renew """
        if self.auto_renew and self.status == 'active':
            self.end_date = now() + timedelta(days=self.plan.duration_days)
            self.save()
    def remaining_days(self):
        """ Trả về số ngày còn lại của subscription """
        if self.end_date > now():
            return (self.end_date - now()).days
        return 0  # Hết hạn
    def __str__(self):
        return f"{self.user.username} - {self.plan.name}"
    class Meta : 
        db_table = 'subscriptions'
class PaymentTransaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    subscription = models.ForeignKey(Subscription,on_delete=models.SET_NULL,null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.ForeignKey(PaymentMethod,on_delete=models.SET_NULL,null=True)
    status = models.CharField(max_length=20, choices=[('success', 'Success'), ('failed', 'Failed'), ('pending', 'Pending')], default='pending')
    transaction_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.id} - {self.status}"
    class Meta : 
        db_table = 'payment_trasactions'

