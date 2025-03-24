from django.urls import path
from .views import LikeSongAPIView

urlpatterns = [
    path('<int:song_id>', LikeSongAPIView.as_view(), name='like-song'),
]
