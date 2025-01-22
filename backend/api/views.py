from django.shortcuts import render

# Create your views here.
# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response

class DemoAPIView(APIView):
    def get(self, request):
        # Sample data to send as JSON
        data = {
            "message": "Hello, React!",
            "status": "success",
            "items": [
                {"id": 1, "name": "Item 1"},
                {"id": 2, "name": "Item 2"},
                {"id": 3, "name": "Item 3"},
            ]
        }
        return Response(data)
