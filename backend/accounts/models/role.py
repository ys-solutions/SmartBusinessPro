from django.db import models


class Role(models.Model):
    """
    Rôle attribué à un utilisateur.
    """

    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nom"
    )

    description = models.TextField(
        blank=True,
        verbose_name="Description"
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    permissions = models.ManyToManyField(
        "accounts.Permission",
        blank=True,
        related_name="roles",
        verbose_name="Permissions",
    )

    class Meta:
        db_table = "roles"
        ordering = ["name"]
        verbose_name = "Rôle"
        verbose_name_plural = "Rôles"

    def __str__(self):
        return self.name