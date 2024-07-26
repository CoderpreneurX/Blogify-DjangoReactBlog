from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from django.urls import reverse
from .models import BlogPost

class TestBlogPost(APITestCase):
    def test_create_blogpost(self):
        user = self.client.post(reverse('register-user'), {'username': 'admin', 'password': 'admin'})
        access = self.client.post(reverse('login-user'), {'username': 'admin', 'password': 'admin'}).data['access']
        blog = self.client.post(reverse('list-create-blogs'), {
            'title': 'Lorem Ipsum',
            'content': 'bhfdbvibv bvfibafv ibviabv aivauh fqhfquvhq v9qhvqe9vh 9qehv9qhv 9qhv9qhv9hq q9hv9uq997ghcbadcusahc avygqevqirvuqe veqhrvu',
            'published_at': '2024-07-24T12:45:00Z',
        }, HTTP_AUTHORIZATION=f'Bearer {access}')
        searched_blogs = self.client.get(reverse('search-blog', kwargs={'keywords': 'lorem'}))
        print(searched_blogs.data)