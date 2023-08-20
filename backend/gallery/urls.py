from django.urls import path
from .views import ImageListView, ImageDetailView, ImageCreateView, ImageDeleteView

urlpatterns = [
    # url for listing all images
    path('gallery/', ImageListView.as_view(), name='image_list'),

    # url for retrieving details of a single image
    path('gallery/<int:pk>/', ImageDetailView.as_view(), name='image_detail'),

    # url for creating a new image
    path('gallery/create/', ImageCreateView.as_view(), name='image_create'),

    # url for deleting an image
    path('gallery/<int:pk>/delete/', ImageDeleteView.as_view(), name='image_delete'),
]
