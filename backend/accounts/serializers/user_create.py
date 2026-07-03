from rest_framework import serializers

from core.base import BaseModelSerializer

from accounts.models import CustomUser


class UserCreateSerializer(BaseModelSerializer):
    """
    Serializer de création d'un utilisateur.
    """

    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    class Meta:
        model = CustomUser

        fields = (
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "telephone",
            "photo",
            "role",
            "is_active",
        )