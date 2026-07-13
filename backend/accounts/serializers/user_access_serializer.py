from rest_framework import serializers

from accounts.models import CustomUser


class UserAccessSerializer(serializers.ModelSerializer):
    """
    Serializer réservé à la gestion des accès.
    """

    class Meta:
        model = CustomUser

        fields = (
            "role",
            "is_active",
            "is_locked",
            "must_change_password",
        )