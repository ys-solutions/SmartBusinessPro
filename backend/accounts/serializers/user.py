from rest_framework import serializers

from core.base import BaseModelSerializer
from accounts.models import CustomUser


class UserListSerializer(BaseModelSerializer):
    """
    Serializer de la liste des utilisateurs.
    """

    photo = serializers.SerializerMethodField()

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
            "last_login",
        )

    def get_photo(self, obj):

        request = self.context.get("request")

        if obj.photo:

            if request:
                return request.build_absolute_uri(obj.photo.url)

            return obj.photo.url

        return None


class UserSerializer(BaseModelSerializer):
    """
    Serializer des utilisateurs.
    """

    photo = serializers.SerializerMethodField()

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

    def get_photo(self, obj):

        request = self.context.get("request")

        if obj.photo:

            if request:
                return request.build_absolute_uri(obj.photo.url)

            return obj.photo.url

        return None