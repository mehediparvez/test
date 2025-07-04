#!/usr/bin/env python3
"""
Test script to verify chatbot API integration
"""

import requests
import json
import time

# Configuration
CHATBOT_URL = "http://localhost:5000"
FRONTEND_URL = "http://localhost:5173"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{CHATBOT_URL}/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print("✅ Health check passed")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_symptoms_endpoint():
    """Test the symptoms listing endpoint"""
    try:
        response = requests.get(f"{CHATBOT_URL}/api/symptoms")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "symptoms" in data
        assert len(data["symptoms"]) > 0
        print(f"✅ Symptoms endpoint passed ({len(data['symptoms'])} symptoms found)")
        return True
    except Exception as e:
        print(f"❌ Symptoms endpoint failed: {e}")
        return False

def test_prediction_endpoint():
    """Test the disease prediction endpoint"""
    try:
        test_symptoms = ["headache", "fever", "nausea"]
        payload = {"symptoms": test_symptoms}
        
        response = requests.post(
            f"{CHATBOT_URL}/api/predict",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "prediction" in data
        assert "disease" in data["prediction"]
        print(f"✅ Prediction endpoint passed (predicted: {data['prediction']['disease']})")
        return True
    except Exception as e:
        print(f"❌ Prediction endpoint failed: {e}")
        return False

def test_chat_endpoint():
    """Test the chat endpoint"""
    try:
        test_message = "I have a headache and fever"
        payload = {"message": test_message}
        
        response = requests.post(
            f"{CHATBOT_URL}/api/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "response" in data
        print(f"✅ Chat endpoint passed")
        return True
    except Exception as e:
        print(f"❌ Chat endpoint failed: {e}")
        return False

def test_cors():
    """Test CORS configuration"""
    try:
        headers = {
            "Origin": FRONTEND_URL,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type"
        }
        
        response = requests.options(f"{CHATBOT_URL}/api/chat", headers=headers)
        assert response.status_code == 200
        print("✅ CORS configuration passed")
        return True
    except Exception as e:
        print(f"❌ CORS test failed: {e}")
        return False

def test_error_handling():
    """Test error handling for invalid inputs"""
    try:
        # Test empty symptoms
        response = requests.post(
            f"{CHATBOT_URL}/api/predict",
            json={"symptoms": []},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400
        
        # Test invalid symptoms
        response = requests.post(
            f"{CHATBOT_URL}/api/predict",
            json={"symptoms": ["nonexistent_symptom"]},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 400
        
        print("✅ Error handling passed")
        return True
    except Exception as e:
        print(f"❌ Error handling test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Starting Chatbot Integration Tests...\n")
    
    tests = [
        ("Health Check", test_health_check),
        ("Symptoms Endpoint", test_symptoms_endpoint),
        ("Prediction Endpoint", test_prediction_endpoint),
        ("Chat Endpoint", test_chat_endpoint),
        ("CORS Configuration", test_cors),
        ("Error Handling", test_error_handling),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"Running {test_name}...")
        if test_func():
            passed += 1
        print()
        time.sleep(1)  # Brief pause between tests
    
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Chatbot integration is working correctly.")
        return 0
    else:
        print("🚨 Some tests failed. Please check the chatbot service.")
        return 1

if __name__ == "__main__":
    exit(main())
