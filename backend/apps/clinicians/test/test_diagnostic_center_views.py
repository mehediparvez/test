from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.clinicians.models.diagnostic_center import DiagnosticCenter
from rest_framework.test import APIClient

User = get_user_model()

class DiagnosticCenterViewSetTestCase(APITestCase):
    def setUp(self):
        # Update to use email, name and user_type
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="password",
            user_type="Patient"  # Adding the required user_type field
        )
        self.client = APIClient()
        # Update login to use email as the username field
        self.client.force_authenticate(user=self.user)

        self.diagnostic_center = DiagnosticCenter.objects.create(
            name="Test Center",
            city="Test City",
            is_24_hours=True,
            has_home_collection=True,
            accepts_insurance=True
        )

    def test_list_diagnostic_centers(self):
        response = self.client.get("/api/clinicians/diagnostic-centers/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_diagnostic_centers_by_city(self):
        response = self.client.get(f"/api/clinicians/diagnostic-centers/?city={self.diagnostic_center.city}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_top_rated_diagnostic_centers(self):
        # Add some rating to the center so it appears in top-rated
        self.diagnostic_center.average_rating = 4.5
        self.diagnostic_center.rating_count = 10
        self.diagnostic_center.save()
        # Use top-rated/ URL (with trailing slash)
        response = self.client.get("/api/clinicians/diagnostic-centers/top-rated/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_diagnostic_center(self):
        data = {
            "name": "New Center",
            "city": "New City",
            "is_24_hours": False,
            "has_home_collection": False,
            "accepts_insurance": True
        }
        response = self.client.post("/api/clinicians/diagnostic-centers/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DiagnosticCenter.objects.count(), 2)