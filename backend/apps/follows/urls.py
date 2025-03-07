from django.urls import path
from .views import FollowArtistAPIView

urlpatterns = [
    path('<int:artist_id>', FollowArtistAPIView.as_view(), name='follow-artist'),
]
