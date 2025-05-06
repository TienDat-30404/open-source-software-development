from django.urls import path
from .views import RoleAPIView

urlpatterns = [
    path('', RoleAPIView.as_view()),  # Lấy danh sách, tạo mới
    path('<uuid:pk>/', RoleAPIView.as_view()),  # Lấy, cập nhật, xóa theo ID
]
