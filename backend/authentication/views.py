from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, ProfileSerializer
from .models import Profile

class RegisterUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    serializer_class = UserSerializer
    queryset = User.objects.none()

class CreateUserProfileView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        data = self.request.data

        user.first_name = data.get('first_name')
        user.last_name = data.get('last_name')
        user.save()

        serializer.save(user=user)

        return serializer
    
class EditUserProfileView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        profile = self.queryset.get(user=user)
        return profile

    def perform_update(self, serializer):
        user = self.request.user
        data = self.request.data

        user.first_name = data.get('first_name')
        user.last_name = data.get('last_name')
        user.save()

        serializer.save(user=user)
        return serializer
    
class RetrieveUserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        user = self.request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response(data={'detail': 'Profile for this user doesn\'t exist'}, status=404)
        return profile
