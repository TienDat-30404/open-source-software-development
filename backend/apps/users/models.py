from django.db import models
from apps.base_model.base_model import BaseModel
from apps.roles.models import Role


# Create your models here.
class User(BaseModel):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    gender = models.CharField(max_length=100, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    
    @property
    def is_authenticated(self):
        # Bạn có thể thay đổi logic của is_authenticated ở đây nếu muốn
        return True  # Hoặc bạn có thể kiểm tra trạng thái đăng nhập ở đây

    class Meta:
        db_table = "users"
