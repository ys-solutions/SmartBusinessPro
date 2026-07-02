from core.base import BaseModelSerializer

from accounts.models import CustomUser


class UserSerializer(BaseModelSerializer):

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
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )