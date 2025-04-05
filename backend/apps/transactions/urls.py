from django.urls import path
from .views import (
    PurchaseSubscriptionView,
    CancelSubscriptionView,
    RenewSubscriptionView,
    CheckPremiumAccessView,
    CurrentSubscriptionView,
    ProcessPaymentVNPayView,
    PaymentVNPayReturnView,
    ProcessPaymentZalopayView,
    CheckTransactionZalopayView,
    ProcessPaymentMomoView,
    CheckTransactionMomoView
)

urlpatterns = [
    path("purchase", PurchaseSubscriptionView.as_view(), name="purchase_subscription"),
    path("cancel", CancelSubscriptionView.as_view(), name="cancel_subscription"),
    path("renew", RenewSubscriptionView.as_view(), name="renew_subscription"),
    path("check-premium", CheckPremiumAccessView.as_view(), name="check_premium"),
    path("current", CurrentSubscriptionView.as_view(), name="current_subscription"),
    path("payment-create-vnpay", ProcessPaymentVNPayView.as_view(), name="payment_create_vnpay"),
    path("payment-return-vnpay", PaymentVNPayReturnView.as_view(), name="payment_return_vnpay"),
    path("payment-create-zalopay", ProcessPaymentZalopayView.as_view(), name="payment_create_zalopay"),
    path("check-transaction-zalopay", CheckTransactionZalopayView.as_view(), name="check_transaction_zalopay"),
    path("payment-create-momo", ProcessPaymentMomoView.as_view(), name="payment_create_momo"),
    path("check-transaction-momo", CheckTransactionMomoView.as_view(), name="check_transaction_momo"),


]
