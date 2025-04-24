FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create app directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Add GitHub Container Registry labels
LABEL org.opencontainers.image.source=https://github.com/YOUR_ORG_NAME/web-wizards
LABEL org.opencontainers.image.description="Web Wizards Backend"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.vendor="${GITHUB_REPOSITORY_OWNER}"

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
