from django.urls import path, include 
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet
router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
urlpatterns = [
    path('api/', include(router.urls))
]