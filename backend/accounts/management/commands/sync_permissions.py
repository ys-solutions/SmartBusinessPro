from django.core.management.base import BaseCommand

from accounts.models import Permission
from core.constants.permissions import Permissions


class Command(BaseCommand):
    """
    Synchronise toutes les permissions métier.
    """

    help = "Synchronise les permissions."

    def handle(self, *args, **options):

        created = 0

        for attribute in dir(Permissions):

            if attribute.startswith("_"):
                continue

            value = getattr(Permissions, attribute)

            if not isinstance(value, str):
                continue

            try:
                module, resource, action = value.split(".")
            except ValueError:
                self.stdout.write(
                    self.style.WARNING(
                        f"Permission invalide : {value}"
                    )
                )
                continue

            permission, is_created = Permission.objects.get_or_create(
                module=module,
                resource=resource,
                action=action,
                defaults={
                    "name": attribute.replace("_", " ").title(),
                    "description": "",
                },
            )

            if is_created:
                created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{created} permission(s) créée(s)."
            )
        )