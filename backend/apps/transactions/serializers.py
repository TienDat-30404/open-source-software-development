from rest_framework import serializers
from .models import Transaction
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'  # Lấy tất cả các trường
        read_only_fields = ['user','plan','payment_method']  # Không cho phép gửi 'user' khi POST
