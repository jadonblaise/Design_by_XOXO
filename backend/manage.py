#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    # Use production settings on Render to ensure migrations/createsuperuser
    # operate on the same database/config as the running service.
    settings_module = (
        'fashion_store.settings_production'
        if ('RENDER_EXTERNAL_HOSTNAME' in os.environ or os.getenv('RENDER', '').lower() == 'true')
        else 'fashion_store.settings'
    )
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
