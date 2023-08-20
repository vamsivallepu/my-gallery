from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Define URL patterns for the project
urlpatterns = [
    # Admin site URL
    path('admin/', admin.site.urls),
    
    # Include URL patterns from the 'users' app
    path('api/', include('users.urls')),
    
    # Include URL patterns from the 'gallery' app
    path('api/', include('gallery.urls')),
    
    # Add URL patterns to serve media files during development
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
