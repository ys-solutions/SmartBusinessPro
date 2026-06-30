from django.db import models


class Permission(models.Model):
    """
    Permission métier.
    """

    code = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Code",
    )

    name = models.CharField(
        max_length=150,
        verbose_name="Nom",
    )

    description = models.TextField(
        blank=True,
        verbose_name="Description",
    )

    module = models.CharField(
        max_length=100,
        verbose_name="Module",
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
        ordering = ["module", "name"]
        verbose_name = "Permission"
        verbose_name_plural = "Permissions"

    def __str__(self):
        return f"{self.module} - {self.name}"