from django.urls import path
from .views import ListeningHistoryAPIView, TopSongsAPIView

urlpatterns = [
    path('listening-history/', ListeningHistoryAPIView.as_view(), name='listening-history'),
    path('top-songs/', TopSongsAPIView.as_view(), name='top-songs'),

]