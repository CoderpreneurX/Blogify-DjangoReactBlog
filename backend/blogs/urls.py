from django.urls import path
from .views import BlogPostListCreateView, BlogPostDetailView, BlogPostCommentListView, BlogPostCommentCreateView, LikeBlogPostAPIView, LikeCommentAPIView, BlogPostSearchView

urlpatterns = [
    path('', BlogPostListCreateView.as_view(), name='list-create-blogs'),
    path('post/<int:pk>/', BlogPostDetailView.as_view(), name='blog-detail-view'),
    path('post/<int:pk>/comments/', BlogPostCommentListView.as_view(), name='list-blog-comments'),
    path('post/<int:pk>/comments/create/', BlogPostCommentCreateView.as_view(), name='create-blog-comments'),
    path('post/<int:pk>/like/', LikeBlogPostAPIView.as_view(), name='like-blog'),
    path('post/comment/<int:pk>/like/', LikeCommentAPIView.as_view(), name='like-comment'),
    path('post/search/<str:keywords>/', BlogPostSearchView.as_view(), name='search-blog'),
]