#!/bin/bash
# Script to build and push Docker images to GitHub Container Registry

# Replace with your organization name
ORG_NAME="YOUR_ORG_NAME"

# Check if organization name is provided as argument
if [ "$1" != "" ]; then
  ORG_NAME=$1
fi

echo "Building and pushing images for organization: $ORG_NAME"

# Login to GitHub Container Registry
echo "Logging in to GitHub Container Registry..."
echo "Please make sure you have a Personal Access Token with appropriate permissions."
echo "You can create one at: https://github.com/settings/tokens"
echo "Required permissions: write:packages, read:packages"

# Build and push backend image
echo "Building backend image..."
docker build -t ghcr.io/$ORG_NAME/web-wizards-backend:latest ./backend
echo "Pushing backend image..."
docker push ghcr.io/$ORG_NAME/web-wizards-backend:latest

# Build and push OCR service image
echo "Building OCR service image..."
docker build -t ghcr.io/$ORG_NAME/web-wizards-ocr:latest ./ocr_service
echo "Pushing OCR service image..."
docker push ghcr.io/$ORG_NAME/web-wizards-ocr:latest

# Build and push frontend image (if needed)
if [ -d "./frontend" ] && [ -f "./frontend/Dockerfile" ]; then
  echo "Building frontend image..."
  docker build -t ghcr.io/$ORG_NAME/web-wizards-frontend:latest ./frontend
  echo "Pushing frontend image..."
  docker push ghcr.io/$ORG_NAME/web-wizards-frontend:latest
fi

echo "All images have been built and pushed to GitHub Container Registry"
echo "You can view your packages at: https://github.com/orgs/$ORG_NAME/packages"