from core.base import BaseModelSerializer

from accounts.models import Permission


class PermissionSerializer(BaseModelSerializer):
    """
    Serializer des permissions.
    """

    class Meta:
        model = Permission

        fields = (
            "id",
            "module",
            "resource",
            "action",
            "name",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )