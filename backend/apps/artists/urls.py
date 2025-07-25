from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet
router = DefaultRouter()
router.register('artists', ArtistViewSet, basename='aritst')
urlpatterns = [
    path('api/', include(router.urls))
]