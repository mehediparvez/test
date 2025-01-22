# api/urls.py
from django.urls import path
from .views import DemoAPIView

urlpatterns = [
    path('demo/', DemoAPIView.as_view(), name='demo-api'),
]
