from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SpecializationViewSet,
    ClinicianViewSet,
    DiagnosticCenterViewSet,
    ReviewViewSet
)

router = DefaultRouter()
router.register(r'specializations', SpecializationViewSet, basename='specialization')
router.register(r'clinicians', ClinicianViewSet, basename='clinician')
router.register(r'diagnostic-centers', DiagnosticCenterViewSet, basename='diagnostic-center')
router.register(r'reviews', ReviewViewSet, basename='review')

app_name = 'clinicians'

# Define custom action URLs before including router.urls to ensure proper priority
urlpatterns = [
    path('diagnostic-centers/top-rated/', DiagnosticCenterViewSet.as_view({'get': 'top_rated'}), name='diagnostic-centers-top-rated'),
    path('', include(router.urls)),
]