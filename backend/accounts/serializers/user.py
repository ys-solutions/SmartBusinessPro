from core.base import BaseModelSerializer

from accounts.models import CustomUser


class UserListSerializer(BaseModelSerializer):
    """
    Serializer de la liste des utilisateurs.
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
            "role",
            "is_active",
            "last_login",
        )

class UserSerializer(BaseModelSerializer):
    """
    Serializer des utilisateurs.
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
            "is_active",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )