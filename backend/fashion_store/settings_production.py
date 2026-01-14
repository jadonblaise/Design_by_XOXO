"""
Production settings for fashion_store project.
This file extends base settings with production-specific configurations.
"""
from .settings import *
import dj_database_url
import os

# Security settings for production
DEBUG = False

RENDER_EXTERNAL_HOSTNAME = os.getenv('RENDER_EXTERNAL_HOSTNAME')
ALLOWED_HOSTS = [RENDER_EXTERNAL_HOSTNAME] if RENDER_EXTERNAL_HOSTNAME else []

# Gett frontend URL from environment variable
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000')

# Build CSRF trusted origins
CSRF_TRUSTED_ORIGINS = []
if RENDER_EXTERNAL_HOSTNAME:
    CSRF_TRUSTED_ORIGINS.append(f"https://{RENDER_EXTERNAL_HOSTNAME}")
if FRONTEND_URL:
    CSRF_TRUSTED_ORIGINS.append(FRONTEND_URL)

SECRET_KEY = os.environ.get('SECRET_KEY')

# Use Render's database URL if available, otherwise use SQLite
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3'),
        conn_max_age=600,
        conn_health_checks=True,
    )
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
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

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

# Database configuration with connection pooling for Render free tier
db_config = dj_database_url.config(
    default=os.environ.get('DATABASE_URL'),
    conn_max_age=600,  # Keep connections alive for 10 minutes
    conn_health_checks=True,  # Enable connection health checks
)

DATABASES = {
    'default': db_config
}

# Add database connection options for better performance on Render free tier
if db_config and 'OPTIONS' not in db_config:
    DATABASES['default']['OPTIONS'] = {}
    
# Set connection timeout and statement timeout
if 'OPTIONS' in DATABASES['default']:
    DATABASES['default']['OPTIONS'].update({
        'connect_timeout': 10,
    })
    # For PostgreSQL, add statement timeout
    if 'options' not in DATABASES['default']['OPTIONS']:
        DATABASES['default']['OPTIONS']['options'] = '-c statement_timeout=30000'
