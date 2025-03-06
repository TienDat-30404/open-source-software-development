from django.urls import path, include 
from rest_framework.routers import DefaultRouter 
from .views import SongViewSet 
router = DefaultRouter()
router.register('songs',  SongViewSet, basename='song')
urlpatterns = [
    path('api/', include(router.urls))
]
