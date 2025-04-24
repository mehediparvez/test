FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies for OCR
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    tesseract-ocr \
    libtesseract-dev \
    libpq-dev \
    gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Add GitHub Container Registry labels
LABEL org.opencontainers.image.source=https://github.com/YOUR_ORG_NAME/web-wizards
LABEL org.opencontainers.image.description="Web Wizards OCR Service"
LABEL org.opencontainers.image.licenses="MIT"

# Expose port
EXPOSE 5000

# Start the OCR service
CMD ["python", "app.py"]