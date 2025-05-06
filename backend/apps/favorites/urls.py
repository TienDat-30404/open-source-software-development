from django.urls import path
from .views import LikeSongAPIView

urlpatterns = [
    path('', LikeSongAPIView.as_view(), name='like-song'),
    path('<uuid:pk>/', LikeSongAPIView.as_view(), name='unlike-by-id'),

]
