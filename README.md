# AmarHealth - Your Complete Healthcare Companion

## Team Members
- **Md. Mehedi Hasan Parvez** - [mehediparvez](https://github.com/mehediparvez) (Team Leader)
- **Faysal Ahammed** - [Faysal0009](https://github.com/Faysal0009)
- **Ishtiak Ahmed** - [YEAD007](https://github.com/YEAD007)

## Mentor
- **Mohammad Ahad** - [maahad767](https://github.com/maahad767)

## Project Description
AmarHealth is a comprehensive healthcare management platform designed to empower users with complete control over their medical data. Our solution simplifies medical record management, and provides AI-powered insights for better healthcare decision-making.

## Project Structure
The application is built with a modern tech stack and follows a microservices architecture:

### Backend
- **Django REST Framework**: Core API services for user management, medical records
- **MySQL**: Primary database
- **Redis**: Caching and background task management
- **Celery**: Asynchronous task processing

### Frontend
- **React**: Single-page application with modular component structure
- **Redux Toolkit**: State management with RTK Query for API interactions
- **TailwindCSS**: Utility-first CSS framework for styling

### OCR Service
- **FastAPI**: High-performance OCR and document processing service
- **AI Processing**: Integration with OpenAI/Gemini models for medical document analysis

### Medical Chatbot
- **Flask API**: AI-powered symptom analysis and health recommendations
- **Machine Learning**: Scikit-learn based disease prediction model
- **Real-time Chat**: Interactive medical assistant with natural language processing

### DevOps
- **Docker & Docker Compose**: Containerization
- **Azure Container Apps**: Cloud deployment platform
- **GitHub Actions**: CI/CD pipeline automation

## Features

### User Management
- Secure account creation and authentication
- Profile management and preferences
- Two-factor authentication

### Medical Records
- Health issue tracking
- Symptom recording and monitoring
- Document management with smart OCR processing
- Lab result tracking and visualization


### Medication Management
- Medication tracking and reminders
- Prescription management
- Refill notifications

### Clinician Portal
- Provider profiles and specializations
- Review system and ratings
- Availability management

### OCR & AI Features
- Automated extraction of test results from uploaded documents
- Parameter classification and abnormality detection
- Trend analysis and visualization

### Medical Assistant Chatbot
- AI-powered symptom analysis and disease prediction
- Personalized health recommendations and precautions
- Natural language conversation interface
- Medication, diet, and exercise suggestions
- Real-time chat with typing indicators

## Getting Started
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/web-wizards.git
   cd web-wizards
   ```

2. Install Dependencies
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   
   # Frontend
   cd ../frontend
   npm install
   
   # OCR Service
   cd ../ocr_service
   pip install -r requirements.txt
   ```

3. Set Up Environment Variables
   - Create `.env` files for each service based on the provided examples
   - Configure chatbot API URL in frontend environment

4. Start Development Servers
   ```bash
   # Using Docker Compose (includes chatbot service)
   docker-compose up
   ```

   Or start services individually:
   ```bash
   # Backend
   cd backend && python manage.py runserver
   
   # Frontend  
   cd frontend && npm run dev
   
   # Chatbot
   cd chatbot && python app.py
   
   # OCR Service
   cd ocr_service && uvicorn main:app --reload
   ```

5. Test Chatbot Integration
   ```bash
   python test_chatbot_integration.py
   ```

## Development Guidelines
1. Create feature branches from the `dev` branch
   ```bash
   git checkout -b feature/your-feature dev
   ```

2. Make small, focused commits with descriptive messages
   ```bash
   git commit -m "feat: implement lab result visualization component"
   ```

3. Follow the migrations guide for database changes
   ```bash
   git checkout migrations
   # Make model changes and create migrations
   python manage.py makemigrations
   ```

4. Create pull requests for review

## Documentation
- [API Documentation](https://amarhealth.tech/api/docs)
- [Development Setup](https://amarhealth.tech/docs/setup)
- [Database Schema](https://amarhealth.tech/docs/schema)
- [OCR Service Integration](https://amarhealth.tech/docs/ocr-service)
- [Chatbot Integration Guide](CHATBOT_INTEGRATION.md)
- [Contribution Guidelines](https://amarhealth.tech/docs/contributing)

## Resources
- [Project Documentation](docs/)
- [Development Setup](docs/setup.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Migrations Guide](MIGRATIONS_GUIDE.md)
