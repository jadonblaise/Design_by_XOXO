#!/bin/bash
# Build script for Render deployment

set -o errexit  # Exit on error

if [[ "${RENDER}" == "true" || -n "${RENDER_EXTERNAL_HOSTNAME}" ]]; then
  # Ensure management commands run with production settings on Render
  export DJANGO_SETTINGS_MODULE="fashion_store.settings_production"
fi

echo "Upgrading pip, setuptools, and wheel..."
pip install --upgrade pip setuptools wheel

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Running migrations..."
python manage.py migrate --noinput

echo "Ensuring Django admin user (if env vars provided)..."
python manage.py ensure_admin

echo "Loading sample data..."
python manage.py load_sample_data

echo "Build completed successfully!"
