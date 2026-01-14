"""
Production settings for fashion_store project.
This file extends base settings with production-specific configurations.
"""
from .settings import *
import dj_database_url
import os
import sys

# Security settings for production
DEBUG = False

RENDER_EXTERNAL_HOSTNAME = os.getenv('RENDER_EXTERNAL_HOSTNAME')
ALLOWED_HOSTS = [RENDER_EXTERNAL_HOSTNAME] if RENDER_EXTERNAL_HOSTNAME else []

# Gett frontend URL from environment variable
FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://xoxodesign.onrender.com')

# Build CSRF trusted origins
CSRF_TRUSTED_ORIGINS = []
if RENDER_EXTERNAL_HOSTNAME:
    CSRF_TRUSTED_ORIGINS.append(f"https://{RENDER_EXTERNAL_HOSTNAME}")
if FRONTEND_URL:
    CSRF_TRUSTED_ORIGINS.append(FRONTEND_URL)

SECRET_KEY = os.environ.get('SECRET_KEY')

# Use Render's database URL if available, otherwise use SQLite
# During build phase, DATABASE_URL might not be set, so we handle that gracefully
database_url = os.getenv('DATABASE_URL', '').strip()

# Check if we're in build phase (collectstatic).
# We intentionally use SQLite during collectstatic so the build never depends on Postgres.
is_build_phase = len(sys.argv) > 1 and 'collectstatic' in sys.argv

if is_build_phase:
    # Build phase or no DATABASE_URL - use SQLite
    # This avoids Postgres driver imports/connection attempts during build.
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
elif database_url and database_url != '':
    try:
        DATABASES = {
            'default': dj_database_url.config(
                default=database_url,
                conn_max_age=600,
                conn_health_checks=True,
            )
        }
    except (ValueError, Exception) as e:
        # If database URL parsing fails, fallback to SQLite
        print(f"Warning: Could not parse DATABASE_URL, using SQLite: {e}")
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }
else:
    # Fallback to SQLite if DATABASE_URL is not set
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# CORS settings - update with your frontend URL
CORS_ALLOWED_ORIGINS = []
if FRONTEND_URL:
    # Support multiple URLs separated by commas
    origins = [origin.strip() for origin in FRONTEND_URL.split(',')]
    CORS_ALLOWED_ORIGINS.extend(origins)

# If no frontend URL is set, temporarily allow all origins for troubleshooting
# TODO: Remove CORS_ALLOW_ALL_ORIGINS in production and set FRONTEND_URL environment variable
if not CORS_ALLOWED_ORIGINS:
    CORS_ALLOW_ALL_ORIGINS = True
    print("WARNING: CORS_ALLOW_ALL_ORIGINS is enabled. Set FRONTEND_URL environment variable for production.")

# Static files with WhiteNoise
STATIC_ROOT = BASE_DIR / 'staticfiles'
# Note: STATICFILES_STORAGE is set via STORAGES below (Django 5.0+)
# Don't set both STATICFILES_STORAGE and STORAGES - they're mutually exclusive

# Media files (if using S3 or similar, configure here)
MEDIA_ROOT = BASE_DIR / 'media'

CORS_ALLOW_CREDENTIALS = True

# Allow all headers and methods for CORS
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

# Add database connection options for better performance on Render free tier
# Only if we're using PostgreSQL (not SQLite)
if DATABASES['default'].get('ENGINE') == 'django.db.backends.postgresql':
    if 'OPTIONS' not in DATABASES['default']:
        DATABASES['default']['OPTIONS'] = {}
    DATABASES['default']['OPTIONS'].update({
        'connect_timeout': 10,
        'options': '-c statement_timeout=30000'
    })
