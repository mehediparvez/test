FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/opt/venv/bin:$PATH"
ARG ENVIRONMENT=development
ENV ENVIRONMENT=$ENVIRONMENT

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

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv && \
    pip install --upgrade pip

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn

# Copy application code
COPY . .

# Set permissions for wait_for_db.py
RUN chmod +x /app/wait_for_db.py

# Add GitHub Container Registry labels
LABEL org.opencontainers.image.source="https://github.com/YOUR_ORG_NAME/web-wizards"
LABEL org.opencontainers.image.description="Web Wizards Backend Service"
LABEL org.opencontainers.image.licenses="MIT"

# Use entrypoint to determine which command to run based on environment
ENTRYPOINT ["sh", "-c"]

# Different command for production vs development
CMD if [ "$ENVIRONMENT" = "production" ]; then \
        python /app/wait_for_db.py && \
        python manage.py migrate --no-input && \
        gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 2; \
    else \
        python /app/wait_for_db.py && \
        python manage.py migrate --no-input && \
        python manage.py runserver 0.0.0.0:8000; \
    fi
