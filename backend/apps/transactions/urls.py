from django.urls import path
from .views import TransactionAPIView, UserTransactionAPIView

urlpatterns = [
    path('', TransactionAPIView.as_view()),  # Lấy danh sách, tạo mới
    path('<int:pk>', TransactionAPIView.as_view()),  # Lấy theo ID
    path('user/<int:user_id>', UserTransactionAPIView.as_view()),  # Lấy theo user
]
