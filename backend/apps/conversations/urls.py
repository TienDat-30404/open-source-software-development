from django.urls import path
from .views import RoomAPIView,RoomMessagesAPIView

urlpatterns = [
    path('rooms', RoomAPIView.as_view(), name='room-list-create'),
    path('rooms/<uuid:pk>', RoomAPIView.as_view(), name='room-detail'),
    path('messages/<str:room_name>', RoomMessagesAPIView.as_view(), name='room-messages'),
]
