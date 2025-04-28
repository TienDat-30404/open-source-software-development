from django.urls import path
from .views import PlanAPIView, ChatOllamaPlan,ChatOllamaArtist
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('/search/plan', ChatOllamaPlan.as_view(), name='plan-search'),
    path('/search/art', ChatOllamaArtist.as_view(), name='art-search'),
    path('', PlanAPIView.as_view(), name='plan-list'),
    path('/<uuid:pk>', PlanAPIView.as_view(), name='plan-detail'),
     
]
