
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.songs.urls')),
    path('', include('apps.artists.urls')),
    path('', include('apps.categories.urls')),
    path('', include('apps.playlists.urls')),
    path('', include('apps.albums.urls')),
    path('api/follows', include('apps.follows.urls')),  
    path('api/favorites', include('apps.favorites.urls')),
    path('api/plans', include('apps.plans.urls')),
    path('api/payment-methods/', include('apps.payment_methods.urls')), 
    path('api/transactions/', include('apps.transactions.urls')), 
    path('api/conversations/', include('apps.conversations.urls')),  
    path('api/history/', include('apps.listening_histories.urls')),
    path('api/auth/', include('apps.users.urls')),
    path('api/user', include('apps.users.urls')),
    path('api/role', include('apps.roles.urls')),
]
