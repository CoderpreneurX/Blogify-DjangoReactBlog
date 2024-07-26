from django.db import models
from django.contrib.auth.models import User

class BlogPost(models.Model):
    status_choices = (
        ('ORGL', 'Original'),
        ('EDIT', 'Edited'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField('Tag', blank=True)
    status = models.CharField(max_length=20, choices=status_choices, default='Original')
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def total_likes(self):
        return self.likes.count()
    
    def __str__(self):
        return self.title

class Tag(models.Model):
    label = models.CharField(max_length=50)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blog = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True)

    def total_likes(self):
        return self.likes.count()