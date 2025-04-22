import os
import sys
import django
import pytest
from django.core.management import call_command

# ===== ENVIRONMENT SETUP =====
# CRITICAL: Configure Python path properly to prevent duplicate imports
# Ensure only the backend directory is in the path, not 'apps' directly
backend_dir = os.path.abspath(os.path.dirname(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Remove any paths that might cause duplicate imports
for path in list(sys.path):
    if path.endswith('apps') or os.path.basename(path) == 'apps':
        sys.path.remove(path)

# ===== PYTEST CONFIGURATION =====
def pytest_configure(config):
    """Configure pytest programmatically."""
    config.addinivalue_line("python_files", "test_*.py")
    config.addinivalue_line("python_classes", "Test*")
    config.addinivalue_line("python_functions", "test_*")
    config.addinivalue_line("testpaths", "apps")

# ===== ENVIRONMENT VARIABLES =====
# Set essential environment variables before Django setup
if 'SECRET_KEY' not in os.environ:
    os.environ['SECRET_KEY'] = 'django-insecure-ihi)mr4kts@_9u3^$9)zegd5sibqmww14d2rv+w%g$eu05k!e8'

if 'DEBUG' not in os.environ:
    os.environ['DEBUG'] = 'True'

# Set database configuration for testing
os.environ.setdefault('DATABASE_ENGINE', 'django.db.backends.sqlite3')
os.environ.setdefault('DATABASE_NAME', ':memory:')  # Use in-memory SQLite for tests
os.environ.setdefault('DATABASE_USER', '')
os.environ.setdefault('DATABASE_PASSWORD', '')
os.environ.setdefault('DATABASE_HOST', '')
os.environ.setdefault('DATABASE_PORT', '')

# Set Cloudinary placeholder values
os.environ.setdefault('CLOUDINARY_CLOUD_NAME', 'test')
os.environ.setdefault('CLOUDINARY_API_KEY', 'test')
os.environ.setdefault('CLOUDINARY_API_SECRET', 'test')

# ===== DJANGO SETUP =====
# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Setup Django
django.setup()

# Add 'testserver' to ALLOWED_HOSTS for testing
from django.conf import settings
settings.ALLOWED_HOSTS += ['testserver', 'localhost', '127.0.0.1']

# Initialize Django apps registry to ensure models are registered correctly
from django.apps import apps
if not apps.ready:
    apps.populate(settings.INSTALLED_APPS)

# Mark all tests as requiring database access
pytestmark = pytest.mark.django_db

# Setup Django test database - simpler approach without django_db_blocker
@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """Set up the test database for Django tests"""
    call_command('migrate')
    yield