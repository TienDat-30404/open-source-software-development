from django.urls import path
from .views import PaymentMethodAPIView

urlpatterns = [
    path('', PaymentMethodAPIView.as_view()),  # Lấy danh sách, tạo mới
    path('<int:pk>', PaymentMethodAPIView.as_view()),  # Lấy, cập nhật, xóa theo ID
]
