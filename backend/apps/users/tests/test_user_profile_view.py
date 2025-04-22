from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.users.models.admin_profile import AdminProfile
from apps.users.models.doctor_profile import DoctorProfile
from apps.users.models.patient_profile import PatientProfile
from rest_framework.test import APIClient
from datetime import date

User = get_user_model()

class UserProfileViewTestCase(APITestCase):
    def setUp(self):
        # Update to use email and name instead of username
        self.admin_user = User.objects.create_user(
            email="admin@example.com", 
            name="Admin User", 
            password="password", 
            user_type="Admin"
        )
        
        self.doctor_user = User.objects.create_user(
            email="doctor@example.com", 
            name="Doctor User", 
            password="password", 
            user_type="Doctor"
        )
        
        self.patient_user = User.objects.create_user(
            email="patient@example.com", 
            name="Patient User", 
            password="password", 
            user_type="Patient"
        )

        # Add all required fields for the profiles
        self.admin_profile = AdminProfile.objects.create(
            user=self.admin_user,
            phone="1234567890",
            address="123 Admin St",
            dob=date(1990, 1, 1),  # Add a valid date of birth
            gender="Male"  # Add a valid gender option
        )
        
        self.doctor_profile = DoctorProfile.objects.create(
            user=self.doctor_user,
            phone="1234567890",
            address="123 Doctor St",
            specialization="Cardiology",
            hospital="City Hospital",
            dob=date(1985, 5, 15),  # Add a valid date of birth
            gender="Female"  # Add a valid gender option
        )
        
        self.patient_profile = PatientProfile.objects.create(
            user=self.patient_user,
            phone="1234567890",
            address="123 Patient St",
            blood_group="O+",
            dob=date(1995, 10, 25),  # Add a valid date of birth
            gender="Male",  # Add a valid gender option
            blood_pressure="120/80",  # Add blood pressure if required
            height=170,
            weight=70
        )

        self.client = APIClient()

    def test_retrieve_admin_profile(self):
        self.client.force_authenticate(user=self.admin_user)
        # Update URL to use the correct path
        response = self.client.get("/api/users/profile/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["phone"], "1234567890")

    def test_retrieve_doctor_profile(self):
        self.client.force_authenticate(user=self.doctor_user)
        # Update URL to use the correct path
        response = self.client.get("/api/users/profile/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["specialization"], "Cardiology")

    def test_retrieve_patient_profile(self):
        self.client.force_authenticate(user=self.patient_user)
        # Update URL to use the correct path
        response = self.client.get("/api/users/profile/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["blood_group"], "O+")