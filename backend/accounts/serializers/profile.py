from core.base import BaseModelSerializer

from accounts.models import CustomUser


class ProfileSerializer(BaseModelSerializer):
    """
    Serializer du profil utilisateur connecté.
    """

    class Meta:

        model = CustomUser

        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "telephone",
            "photo",
            "role",
            "created_at",
            "last_login",
        )

        read_only_fields = (
            "id",
            "username",
            "role",
            "created_at",
            "last_login",
        )