import os
import sys
import django
from django.conf import settings

# Add the parent directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

# Set essential environment variables before Django setup
if 'SECRET_KEY' not in os.environ:
    os.environ['SECRET_KEY'] = 'django-insecure-ihi)mr4kts@_9u3^$9)zegd5sibqmww14d2rv+w%g$eu05k!e8'

if 'DEBUG' not in os.environ:
    os.environ['DEBUG'] = 'True'

# Set database configuration for testing
os.environ.setdefault('DATABASE_ENGINE', 'django.db.backends.sqlite3')
os.environ.setdefault('DATABASE_NAME', 'db.sqlite3')
os.environ.setdefault('DATABASE_USER', '')
os.environ.setdefault('DATABASE_PASSWORD', '')
os.environ.setdefault('DATABASE_HOST', '')
os.environ.setdefault('DATABASE_PORT', '')

# Set Cloudinary placeholder values
os.environ.setdefault('CLOUDINARY_CLOUD_NAME', 'test')
os.environ.setdefault('CLOUDINARY_API_KEY', 'test')
os.environ.setdefault('CLOUDINARY_API_SECRET', 'test')

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Setup Django
django.setup()

# Initialize apps registry properly
from django.apps import apps
if not apps.ready:
    apps.populate(settings.INSTALLED_APPS)