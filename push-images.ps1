# PowerShell script to build and push Docker images to GitHub Container Registry

# Replace with your organization name
$ORG_NAME = "YOUR_ORG_NAME"

# Check if organization name is provided as argument
if ($args.Count -gt 0) {
    $ORG_NAME = $args[0]
}

Write-Host "Building and pushing images for organization: $ORG_NAME" -ForegroundColor Green

# Login to GitHub Container Registry
Write-Host "Logging in to GitHub Container Registry..." -ForegroundColor Yellow
Write-Host "Please make sure you have a Personal Access Token with appropriate permissions."
Write-Host "You can create one at: https://github.com/settings/tokens"
Write-Host "Required permissions: write:packages, read:packages"

# Prompt for GitHub token
$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

# Login to Docker with the token
Write-Host "Logging in to GitHub Container Registry..."
$username = Read-Host "Enter your GitHub username"
$plainToken | docker login ghcr.io -u $username --password-stdin

# Build and push backend image
Write-Host "Building backend image..." -ForegroundColor Yellow
docker build -t "ghcr.io/$ORG_NAME/web-wizards-backend:latest" ./backend
Write-Host "Pushing backend image..." -ForegroundColor Yellow
docker push "ghcr.io/$ORG_NAME/web-wizards-backend:latest"

# Build and push OCR service image
Write-Host "Building OCR service image..." -ForegroundColor Yellow
docker build -t "ghcr.io/$ORG_NAME/web-wizards-ocr:latest" ./ocr_service
Write-Host "Pushing OCR service image..." -ForegroundColor Yellow
docker push "ghcr.io/$ORG_NAME/web-wizards-ocr:latest"

# Build and push frontend image (if needed)
if ((Test-Path -Path "./frontend") -and (Test-Path -Path "./frontend/Dockerfile")) {
    Write-Host "Building frontend image..." -ForegroundColor Yellow
    docker build -t "ghcr.io/$ORG_NAME/web-wizards-frontend:latest" ./frontend
    Write-Host "Pushing frontend image..." -ForegroundColor Yellow
    docker push "ghcr.io/$ORG_NAME/web-wizards-frontend:latest"
}

Write-Host "All images have been built and pushed to GitHub Container Registry" -ForegroundColor Green
Write-Host "You can view your packages at: https://github.com/orgs/$ORG_NAME/packages"