import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create or update a Django superuser from environment variables (Render-friendly)."

    def handle(self, *args, **options):
        """
        Supported env vars (either style works):
          - Preferred:
              - ADMIN_USERNAME
              - ADMIN_EMAIL (optional but recommended)
              - ADMIN_PASSWORD
          - Also supported (common in tutorials):
              - DJANGO_SUPERUSER_USERNAME
              - DJANGO_SUPERUSER_EMAIL (optional)
              - DJANGO_SUPERUSER_PASSWORD

        Optional toggle:
          - CREATE_SUPERUSER=True/False
            If set to a falsy value, this command will do nothing.

        This command is idempotent:
          - If user doesn't exist, it will create a superuser.
          - If user exists, it will ensure is_staff/is_superuser and update password.
        """
        create_toggle = (os.getenv("CREATE_SUPERUSER") or "").strip().lower()
        if create_toggle in {"0", "false", "no", "off"}:
            self.stdout.write(self.style.WARNING("Skipping ensure_admin: CREATE_SUPERUSER is disabled."))
            return

        username = (
            (os.getenv("ADMIN_USERNAME") or os.getenv("DJANGO_SUPERUSER_USERNAME") or "").strip()
        )
        email = (os.getenv("ADMIN_EMAIL") or os.getenv("DJANGO_SUPERUSER_EMAIL") or "").strip()
        password = os.getenv("ADMIN_PASSWORD") or os.getenv("DJANGO_SUPERUSER_PASSWORD") or ""

        if not username or not password:
            self.stdout.write(
                self.style.WARNING(
                    "Skipping ensure_admin: set ADMIN_USERNAME/ADMIN_PASSWORD (or DJANGO_SUPERUSER_USERNAME/DJANGO_SUPERUSER_PASSWORD) to enable."
                )
            )
            return

        User = get_user_model()
        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email} if email else {},
        )

        # Ensure admin flags
        changed = False
        if not getattr(user, "is_staff", False):
            user.is_staff = True
            changed = True
        if not getattr(user, "is_superuser", False):
            user.is_superuser = True
            changed = True

        # Ensure email if provided
        if email and getattr(user, "email", "") != email:
            user.email = email
            changed = True

        # Always set password from env (lets you reset via redeploy)
        user.set_password(password)
        changed = True

        if changed:
            user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f"Created superuser '{username}'"))
        else:
            self.stdout.write(self.style.SUCCESS(f"Updated superuser '{username}'"))

