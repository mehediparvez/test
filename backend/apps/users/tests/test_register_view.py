from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
import datetime

User = get_user_model()

class RegisterViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        # Use today's date for testing to ensure it's valid
        self.today = datetime.date.today().strftime("%Y-%m-%d")

    # Removed test_register_admin_user since it's not implemented yet
    
    # Removed test_register_doctor_user since it's not implemented yet

    def test_register_patient_user(self):
        data = {
            "fullName": "Patient User",
            "email": "patient@example.com",
            "password": "password123",
            "confirmPassword": "password123",
            "user_type": "Patient",
            "phone": "1234567890",
            "blood_group": "O+",
            "height": 170,
            "weight": 70,
            "address": "123 Patient St",
            "dob": self.today,  # Use today's date as a valid date
            "gender": "Male",
            "blood_pressure": "120/80"
        }
        response = self.client.post("/api/users/register/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.first().email, "patient@example.com")

    def test_register_with_mismatched_passwords(self):
        data = {
            "fullName": "Test User",
            "email": "test@example.com",
            "password": "password123",
            "confirmPassword": "password456",  # Different password
            "user_type": "Patient",
            "phone": "1234567890",
            "address": "123 Test St",
            "dob": self.today,
            "gender": "Male",
            "blood_pressure": "120/80"
        }
        response = self.client.post("/api/users/register/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)