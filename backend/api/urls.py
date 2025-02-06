# api/urls.py
from django.urls import path
from .views import DemoAPIView
from apps.users import urls as users_urls
from django.urls import include

urlpatterns = [
    path('demo/', DemoAPIView.as_view(), name='demo-api'),
    path('users/', include(users_urls)),
]
