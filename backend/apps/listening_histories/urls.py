from django.urls import path
from .views import ListeningHistoryAPIView

urlpatterns = [
    path('listening-history/', ListeningHistoryAPIView.as_view(), name='listening-history'),
]