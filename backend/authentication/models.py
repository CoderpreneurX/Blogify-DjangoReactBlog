from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile_user')
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    bio = models.TextField(max_length=250, null=True, blank=True)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f'{self.user.username} Profile'