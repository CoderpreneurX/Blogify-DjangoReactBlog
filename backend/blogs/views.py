from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from .serializers import BlogPostSerializer, TagSerializer, CommentSerializer
from .models import BlogPost, Tag, Comment

# Blog post list and create view
class BlogPostListCreateView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny, IsAuthenticatedOrReadOnly]
    authentication_classes = []

    def perform_create(self, serializer):
        user = self.request.user # Retrieve user from the request
        serializer.save(user=user) # Save the serializer instance with the retrieved user
        return serializer # Return the serializer

# Blog post detail view
class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

# Blog post's comments list and create view
class BlogPostCommentListView(generics.ListAPIView):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        blog_post_id = self.kwargs.get('pk')
        print('Blog post id:', blog_post_id)
        try:
            blog = BlogPost.objects.get(pk=blog_post_id)
            return Comment.objects.filter(blog=blog).order_by('-created_at')
        except Comment.DoesNotExist:
            self.pagination_class = None
            return Comment.objects.none()
        
class BlogPostCommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        blog_post_id = self.request.data.get('blog_post_id')
        blog = BlogPost.objects.get(pk=blog_post_id)
        user = self.request.user
        serializer.save(user=user, blog=blog)

class LikeBlogPostAPIView(generics.GenericAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def post(self, request, pk):
        blog_post = self.get_object()
        user = self.request.user

        if user in blog_post.likes.all():
            blog_post.likes.remove(user)
            liked = False
        else:
            blog_post.likes.add(user)
            liked = True

        blog_post.save()
        return Response({'liked': liked, 'likes_count': blog_post.total_likes()}, status=status.HTTP_200_OK)
    
class LikeCommentAPIView(generics.GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, pk):
        print('pk is', pk)
        comment = self.get_object()
        user = self.request.user

        if user in comment.likes.all():
            comment.likes.remove(user)
            liked = False
        else:
            comment.likes.add(user)
            liked = True

        comment.save()
        return Response({'liked': liked, 'likes_count': comment.total_likes()}, status=status.HTTP_200_OK)
    
class BlogPostSearchView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        keywords = self.kwargs.get('keywords')
        try:
            blog_posts = BlogPost.objects.filter(title__icontains=keywords).order_by('-created_at')
        except BlogPost.DoesNotExist:
            blog_posts = BlogPost.objects.none()
        return blog_posts