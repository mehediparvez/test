from django.contrib.auth.hashers import make_password
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Users

class AuthTestCase(APITestCase):

    def setUp(self):
        self.user = Users.objects.create(
            name="Test User",
            email="test@example.com",
            password=make_password("testpass123")
        )
        self.register_url = "/api/register/"
        self.login_url = "/api/login/"

    def test_register_user(self):
        """ Test User Registration """
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "securepassword123"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        """ Test User Login """
        data = {
            "email": "test@example.com",
            "password": "testpass123"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_invalid_credentials(self):
        """ Test Login with Invalid Credentials """
        data = {
            "email": "wrong@example.com",
            "password": "wrongpassword"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
