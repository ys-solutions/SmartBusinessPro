from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    """
    Modèle utilisateur personnalisé.
    """

    role = models.ForeignKey(
        "accounts.Role",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="users",
        verbose_name="Rôle",
    )   

    telephone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name="Téléphone",
    )

    photo = models.ImageField(
        upload_to="users/photos/",
        blank=True,
        null=True,
        verbose_name="Photo",
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    must_change_password = models.BooleanField(
        default=True,
        verbose_name="Doit changer son mot de passe",
    )

    is_locked = models.BooleanField(
        default=False,
        verbose_name="Compte verrouillé",
    )

    failed_login_attempts = models.PositiveIntegerField(
        default=0,
        verbose_name="Nombre d'échecs de connexion",
    )

    password_changed_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Dernier changement de mot de passe",
    )

    # Gestionnaire personnalisé
    objects = CustomUserManager()

   

    class Meta:
        db_table = "users"
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"

    def __str__(self):
        return self.get_full_name() or self.username