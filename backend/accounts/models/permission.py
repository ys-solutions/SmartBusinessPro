from django.db import models


class Permission(models.Model):
    """
    Permission métier.
    """

    module = models.CharField(
        max_length=50,
        verbose_name="Module",
    )

    resource = models.CharField(
        max_length=50,
        verbose_name="Ressource",
    )

    action = models.CharField(
        max_length=50,
        verbose_name="Action",
    )

    name = models.CharField(
        max_length=150,
        verbose_name="Nom",
    )

    description = models.TextField(
        blank=True,
        verbose_name="Description",
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        db_table = "permissions"

        ordering = [
            "module",
            "resource",
            "action",
        ]

        unique_together = (
            "module",
            "resource",
            "action",
        )

        verbose_name = "Permission"
        verbose_name_plural = "Permissions"

    @property
    def code(self):
        return f"{self.module}.{self.resource}.{self.action}"

    def __str__(self):
        return self.code