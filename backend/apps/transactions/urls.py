from django.urls import path
from .views import TransactionAPIView,VNPayReturnAPIView

urlpatterns = [
    path('', TransactionAPIView.as_view()),  # Lấy danh sách, tạo mới
    path('<int:pk>', TransactionAPIView.as_view()),  # Lấy theo ID
    path('vnpay-return',VNPayReturnAPIView.as_view()), 
]
