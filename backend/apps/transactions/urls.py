
from django.urls import path
from .views import PurchaseSubscriptionView, CancelSubscriptionView, RenewSubscriptionView, CheckPremiumAccessView

urlpatterns = [
    path('purchase', PurchaseSubscriptionView.as_view(), name='purchase_subscription'),
    path('cancel', CancelSubscriptionView.as_view(), name='cancel_subscription'),
    path('renew', RenewSubscriptionView.as_view(), name='renew_subscription'),
    path('check-premium', CheckPremiumAccessView.as_view(), name='check_premium'),
]
