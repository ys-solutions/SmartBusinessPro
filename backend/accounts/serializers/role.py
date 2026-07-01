from rest_framework import serializers

from accounts.models import Role


class RoleSerializer(serializers.ModelSerializer):
    """
    Serializer des rôles.
    """

    class Meta:
        model = Role

        fields = (
            "id",
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