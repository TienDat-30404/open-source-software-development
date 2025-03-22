from rest_framework import serializers
from .models import Subscription, PaymentTransaction
class SubscriptionSerializer(serializers.ModelSerializer):

    plan_name = serializers.CharField(source='plan.name', read_only=True)
    remaining_days = serializers.SerializerMethodField()
    class Meta:
        model = Subscription
        fields = ['id','plan_name', 'start_date', 'end_date','remaining_days',"status", 'auto_renew']
    def get_remaining_days(self, obj):
        return obj.remaining_days()
class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = '__all__'