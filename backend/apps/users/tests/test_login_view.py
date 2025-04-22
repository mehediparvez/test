from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

class LoginViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        # Update to use email, name and user_type
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="password123",
            user_type="Patient"  # Adding the required user_type field
        )

    def test_login_with_valid_credentials(self):
        data = {
            "email": "test@example.com",
            "password": "password123"
        }
        # Update URL to use the correct path
        response = self.client.post("/api/users/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_with_invalid_credentials(self):
        data = {
            "email": "test@example.com",
            "password": "wrongpassword"
        }
        # Update URL to use the correct path
        response = self.client.post("/api/users/login/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)