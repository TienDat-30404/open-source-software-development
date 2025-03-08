from django.urls import path
from .views import TransactionAPIView

urlpatterns = [
    path('', TransactionAPIView.as_view()),  # Lấy danh sách, tạo mới
    path('<int:pk>', TransactionAPIView.as_view()),  # Lấy theo ID
]
