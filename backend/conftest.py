import os
import sys
import django
from django.conf import settings

# Add the parent directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Setup Django
django.setup()

# Initialize apps registry properly
from django.apps import apps
if not apps.ready:
    apps.populate(settings.INSTALLED_APPS)