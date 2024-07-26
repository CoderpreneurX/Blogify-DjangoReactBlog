from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import RegisterUserView, CreateUserProfileView, EditUserProfileView, RetrieveUserProfileView

urlpatterns = [
    path('user/register/', RegisterUserView.as_view(), name='register-user'),
    path('user/login/', TokenObtainPairView.as_view(), name='login-user'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh-token'),
    path('token/verify/', TokenVerifyView.as_view(), name='verify-token'),
    path('profile/register/', CreateUserProfileView.as_view(), name='create-user-profile'),
    path('profile/edit/', EditUserProfileView.as_view(), name='edit-user-profile'),
    path('profile/', RetrieveUserProfileView.as_view(), name='retrieve-user-profile'),
]