# users/urls.py
from django.urls import path
from .views import RegisterAPIView, RefreshTokenView, LoginAPIView, UserProfileView, UpdateUserProfileView, test_api
from .views import UserAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('update-profile/', UpdateUserProfileView.as_view(), name='update_profile'),
    path('', UserAPIView.as_view()),  # Lấy danh sách, tạo mới
    path('<uuid:pk>/', UserAPIView.as_view()),  # Lấy, cập nhật, xóa theo ID
    path('test/', test_api, name='test-api'),
    path('refresh-token/', RefreshTokenView.as_view(), name='refresh_token'),
]
