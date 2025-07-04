#!/bin/bash

echo "Starting AmarHealth Development Environment..."
echo

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Docker is not running. Please start Docker first."
    exit 1
fi

echo "Starting all services with Docker Compose..."
docker-compose up -d

echo
echo "Waiting for services to start..."
sleep 10

echo
echo "Checking service health..."

# Check backend
if curl -s http://localhost:8000/api/health >/dev/null 2>&1; then
    echo "✅ Backend: Running on http://localhost:8000"
else
    echo "⏳ Backend: Starting..."
fi

# Check frontend
if curl -s http://localhost:5173 >/dev/null 2>&1; then
    echo "✅ Frontend: Running on http://localhost:5173"
else
    echo "⏳ Frontend: Starting..."
fi

# Check chatbot
if curl -s http://localhost:5000/health >/dev/null 2>&1; then
    echo "✅ Chatbot: Running on http://localhost:5000"
else
    echo "⏳ Chatbot: Starting..."
fi

echo
echo "AmarHealth is starting up!"
echo
echo "Services:"
echo "- Frontend: http://localhost:5173"
echo "- Backend API: http://localhost:8000"
echo "- Medical Chatbot: http://localhost:5000"
echo "- Database: localhost:3306"
echo
echo "Press Ctrl+C to exit and view logs..."

docker-compose logs -f
