@echo off
echo Starting AmarHealth Development Environment...
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo Starting all services with Docker Compose...
docker-compose up -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo Checking service health...

REM Check backend
curl -s http://localhost:8000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend: Running on http://localhost:8000
) else (
    echo ⏳ Backend: Starting...
)

REM Check frontend
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend: Running on http://localhost:5173
) else (
    echo ⏳ Frontend: Starting...
)

REM Check chatbot
curl -s http://localhost:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Chatbot: Running on http://localhost:5000
) else (
    echo ⏳ Chatbot: Starting...
)

echo.
echo AmarHealth is starting up!
echo.
echo Services:
echo - Frontend: http://localhost:5173
echo - Backend API: http://localhost:8000
echo - Medical Chatbot: http://localhost:5000
echo - Database: localhost:3306
echo.
echo Press any key to view logs, or Ctrl+C to exit...
pause >nul

docker-compose logs -f
