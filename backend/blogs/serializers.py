from rest_framework import serializers
from authentication.serializers import UserSerializer
from .models import BlogPost, Tag, Comment

class BlogPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    likes_count = serializers.SerializerMethodField()
    class Meta:
        model = BlogPost
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'required': False
            }
        }
    def get_likes_count(self, obj):
        return obj.total_likes()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    likes_count = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {
            'blog': {'required': False}
        }
    def get_likes_count(self, obj):
        return obj.total_likes()