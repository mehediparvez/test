# Medical Chatbot Integration

This document describes the integration of the AI-powered medical chatbot as a microservice within the Web Wizards healthcare platform.

## Overview

The medical chatbot has been converted from a standalone Flask application to a RESTful microservice that integrates seamlessly with the React frontend. It provides AI-powered symptom analysis and health recommendations to authenticated users.

## Architecture

```
Frontend (React) -> Chatbot API (Flask) -> ML Model (scikit-learn)
```

### Components

1. **Chatbot Service** (`/chatbot/`)
   - Flask-based REST API
   - Symptom analysis using machine learning
   - Health recommendations and precautions
   - Dockerized microservice

2. **Frontend Integration** (`/frontend/src/`)
   - Updated Chat component with real-time messaging
   - API service for chatbot communication
   - Enhanced UI with bot status indicators
   - Typing indicators and message formatting

## API Endpoints

### Health Check
```
GET /health
```
Returns the health status of the chatbot service.

### Get Symptoms
```
GET /api/symptoms
```
Returns a list of all available symptoms the chatbot can analyze.

### Predict Disease
```
POST /api/predict
Content-Type: application/json

{
  "symptoms": ["headache", "fever", "nausea"]
}
```
Analyzes symptoms and returns disease predictions with recommendations.

### Chat Interface
```
POST /api/chat
Content-Type: application/json

{
  "message": "I have a headache and fever"
}
```
Conversational interface for natural language symptom analysis.

## Features

### For Users
- **Natural Language Processing**: Describe symptoms in plain English
- **AI-Powered Analysis**: Machine learning-based disease prediction
- **Comprehensive Recommendations**: 
  - Disease descriptions
  - Precautions and safety measures
  - Medication suggestions
  - Diet recommendations
  - Exercise suggestions
- **Real-time Chat Interface**: Interactive messaging with typing indicators
- **Quick Actions**: Pre-defined symptom buttons for common issues

### For Developers
- **Microservice Architecture**: Independently deployable and scalable
- **RESTful API**: Clean, documented endpoints
- **Docker Support**: Containerized deployment
- **Health Monitoring**: Built-in health checks
- **CORS Enabled**: Ready for cross-origin requests
- **Error Handling**: Comprehensive error responses

## Setup and Deployment

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for frontend development)
- Python 3.9+ (for chatbot development)

### Quick Start

1. **Start all services**:
   ```bash
   docker-compose up -d
   ```

2. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000
   - Chatbot: http://localhost:5000
   - Database: localhost:3306

### Environment Variables

#### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000/api)
- `VITE_CHATBOT_API_URL`: Chatbot API URL (default: http://localhost:5000/api)

#### Chatbot
- `PORT`: Service port (default: 5000)
- `FLASK_ENV`: Environment mode (development/production)

### Development Mode

1. **Start backend and database**:
   ```bash
   docker-compose up -d backend db
   ```

2. **Start chatbot service**:
   ```bash
   cd chatbot
   pip install -r requirements.txt
   python app.py
   ```

3. **Start frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Data Files

The chatbot requires several CSV files for proper operation:
- `symtoms_df.csv`: Symptom definitions
- `description.csv`: Disease descriptions
- `precautions_df.csv`: Safety precautions
- `medications.csv`: Medication recommendations
- `diets.csv`: Diet suggestions
- `workout_df.csv`: Exercise recommendations
- `svc.pkl`: Trained machine learning model

## Security Considerations

- **Authentication**: Users must be logged in to access the chatbot
- **Rate Limiting**: Consider implementing rate limiting for API calls
- **Input Validation**: All user inputs are validated and sanitized
- **CORS**: Configured for specific frontend origins
- **Health Checks**: Built-in monitoring for service availability

## Limitations and Disclaimers

⚠️ **Important Medical Disclaimer**

This chatbot is an AI assistant for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Users should:

- Always consult qualified healthcare professionals for medical concerns
- Seek immediate medical attention for emergency situations
- Not rely solely on AI predictions for health decisions
- Understand that the AI may not be 100% accurate

## Monitoring and Troubleshooting

### Health Checks
The chatbot service includes health endpoints for monitoring:
```bash
curl http://localhost:5000/health
```

### Common Issues

1. **Chatbot Offline**: Check if the service is running and the port is accessible
2. **Model Loading Errors**: Ensure all CSV files and the pickle model are present
3. **CORS Errors**: Verify the frontend URL is in the CORS origins list
4. **Memory Issues**: The ML model requires sufficient RAM for loading

### Logs
View service logs:
```bash
docker-compose logs chatbot
```

## Future Enhancements

- **Multi-language Support**: Symptom analysis in multiple languages
- **Voice Input**: Speech-to-text for symptom description
- **Medical History**: Integration with user medical records
- **Appointment Scheduling**: Direct integration with healthcare providers
- **Telemedicine**: Video consultation features
- **Advanced ML Models**: More sophisticated disease prediction models

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
