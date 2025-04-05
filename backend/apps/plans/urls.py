from django.urls import path
from .views import PlanAPIView
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('', PlanAPIView.as_view(), name='plan-list'),
    path('<uuid:pk>', PlanAPIView.as_view(), name='plan-detail'),
]
