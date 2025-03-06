
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.songs.urls')),
    path('', include('apps.artists.urls')),
    path('', include('apps.categories.urls'))
]
