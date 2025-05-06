from django.urls import path
from .views import FollowArtistAPIView

urlpatterns = [
    path('', FollowArtistAPIView.as_view(), name='follow-artist'),
]
