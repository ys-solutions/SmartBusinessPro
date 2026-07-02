from rest_framework import serializers

from accounts.models import Permission


class RolePermissionSerializer(serializers.Serializer):
    """
    Serializer pour attribuer des permissions à un rôle.
    """

    permissions = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Permission.objects.filter(
            is_active=True,
        ),
    )