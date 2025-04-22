from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.clinicians.models.review import Review
from apps.clinicians.models.diagnostic_center import DiagnosticCenter
from apps.clinicians.models.clinician import Clinician
from rest_framework.test import APIClient

User = get_user_model()

class ReviewViewSetTestCase(APITestCase):
    def setUp(self):
        # Update to use email, name and user_type
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test User",
            password="password",
            user_type="Patient"  # Adding the required user_type field
        )
        self.client = APIClient()
        # Use force_authenticate instead of login
        self.client.force_authenticate(user=self.user)

        self.clinician = Clinician.objects.create(name="Test Clinician", city="Test City")
        self.diagnostic_center = DiagnosticCenter.objects.create(name="Test Center", city="Test City")

        # Create a review for a clinician only (not diagnostic_center)
        self.clinician_review = Review.objects.create(
            user=self.user,
            clinician=self.clinician,
            diagnostic_center=None,  # Must be None to satisfy the constraint
            rating=5,
            comment="Great clinician service!",
            is_verified=True
        )

        # Create a separate review for a diagnostic_center only (not clinician)
        self.center_review = Review.objects.create(
            user=self.user,
            clinician=None,  # Must be None to satisfy the constraint
            diagnostic_center=self.diagnostic_center,
            rating=4,
            comment="Good diagnostic center!",
            is_verified=True
        )

    def test_list_reviews(self):
        response = self.client.get("/api/clinicians/reviews/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_reviews_by_clinician(self):
        response = self.client.get(f"/api/clinicians/reviews/?clinician_id={self.clinician.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_filter_reviews_by_diagnostic_center(self):
        response = self.client.get(f"/api/clinicians/reviews/?diagnostic_center_id={self.diagnostic_center.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_review(self):
        data = {
            "clinician": self.clinician.id,
            # Remove the None value for diagnostic_center, we'll handle it in the view
            "rating": 4,
            "comment": "Good service!",
            "is_verified": True
        }
        response = self.client.post("/api/clinicians/reviews/", data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 3)  # Now we have 3 reviews total