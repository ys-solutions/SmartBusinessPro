from django.db import models

from accounts.models import CustomUser


class LoginHistory(models.Model):
    """
    Historique des connexions.
    """

    STATUS_CHOICES = (
        ("SUCCESS", "Connexion réussie"),
        ("FAILED", "Connexion échouée"),
        ("LOGOUT", "Déconnexion"),
    )

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="login_histories",
        verbose_name="Utilisateur",
    )

    username = models.CharField(
        max_length=150,
        blank=True,
        verbose_name="Nom d'utilisateur",
    )

    login_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de connexion",
    )

    logout_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date de déconnexion",
    )

    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        verbose_name="Adresse IP",
    )

    user_agent = models.TextField(
        blank=True,
        verbose_name="User Agent",
    )

    browser = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Navigateur",
    )

    operating_system = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Système",
    )

    device = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Appareil",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="SUCCESS",
    )

    failure_reason = models.TextField(
        blank=True,
        verbose_name="Motif de l'échec",
    )

    session_duration = models.PositiveIntegerField(
        default=0,
        verbose_name="Durée (secondes)",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    logout_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Déconnexion",
    )

    session_duration = models.DurationField(
        null=True,
        blank=True,
        verbose_name="Durée de session",
    )

    class Meta:
        db_table = "login_history"
        ordering = ["-login_at"]
        verbose_name = "Historique de connexion"
        verbose_name_plural = "Historiques de connexion"

    def __str__(self):
        return f"{self.username} - {self.login_at}"