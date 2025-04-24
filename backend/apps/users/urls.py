# users/urls.py
from django.urls import path
from .views import RegisterAPIView, LoginAPIView, UserProfileView,UpdateUserProfileView
from .views import UserAPIView
urlpatterns = [
    path('register', RegisterAPIView.as_view(), name='register'),
    path('login', LoginAPIView.as_view(), name='login'),
    path('profile', UserProfileView.as_view(), name='profile'),
    path('update-profile', UpdateUserProfileView.as_view(), name='update_profile'),
    path('', UserAPIView.as_view()),  # Lấy danh sách, tạo mới
    path('/<uuid:pk>', UserAPIView.as_view()),  # Lấy, cập nhật, xóa theo ID
]
