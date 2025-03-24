from django.urls import path
from .views import PlanAPIView

urlpatterns = [
    path('', PlanAPIView.as_view(), name='plan-list'),
    path('<uuid:pk>', PlanAPIView.as_view(), name='plan-detail'),
]
