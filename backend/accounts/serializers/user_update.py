import re

from rest_framework import serializers

from core.base import BaseModelSerializer
from accounts.models import CustomUser


class UserUpdateSerializer(BaseModelSerializer):

    class Meta:
        model = CustomUser

        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "telephone",
            "photo",
            "role",
            "is_active",
        )

    def validate_username(self, value):

        value = value.strip()

        user = self.instance

        if len(value) < 3:
            raise serializers.ValidationError(
                "Le nom d'utilisateur doit contenir au moins 3 caractères."
            )

        if len(value) > 30:
            raise serializers.ValidationError(
                "Le nom d'utilisateur ne peut pas dépasser 30 caractères."
            )

        if not re.match(r"^[A-Za-z0-9._]+$", value):
            raise serializers.ValidationError(
                "Caractères non autorisés."
            )

        if (
            CustomUser.objects
            .exclude(pk=user.pk)
            .filter(username=value)
            .exists()
        ):
            raise serializers.ValidationError(
                "Ce nom d'utilisateur existe déjà."
            )

        return value

    def validate_email(self, value):

        user = self.instance

        if (
            CustomUser.objects
            .exclude(pk=user.pk)
            .filter(email__iexact=value)
            .exists()
        ):
            raise serializers.ValidationError(
                "Cette adresse email existe déjà."
            )

        return value

    def validate_telephone(self, value):

        user = self.instance

        if value:

            if not value.isdigit():
                raise serializers.ValidationError(
                    "Le téléphone doit contenir uniquement des chiffres."
                )

            if len(value) != 10:
                raise serializers.ValidationError(
                    "Le téléphone doit contenir exactement 10 chiffres."
                )

            if (
                CustomUser.objects
                .exclude(pk=user.pk)
                .filter(telephone=value)
                .exists()
            ):
                raise serializers.ValidationError(
                    "Ce numéro existe déjà."
                )

        return value