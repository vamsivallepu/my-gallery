from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView

# URL patterns for the authentication and user-related views
urlpatterns = [
    # Endpoint for user registration
    path('register/', RegisterView.as_view(), name='register'),
    
    # Endpoint for user login
    path('login/', LoginView.as_view(), name='login'),
    
    # Endpoint to retrieve user information
    path('user/', UserView.as_view(), name='user'),
    
    # Endpoint for user logout
    path('logout/', LogoutView.as_view(), name='logout'),
]