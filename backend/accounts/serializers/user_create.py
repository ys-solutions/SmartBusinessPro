import re

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

    def validate_username(self, value):

        value = value.strip()

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
                "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, '.' et '_'."
            )

        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Ce nom d'utilisateur existe déjà."
            )

        return value

    def validate_email(self, value):

        value = value.strip()

        if CustomUser.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "Cette adresse email existe déjà."
            )

        return value

    def validate_telephone(self, value):

        if value:

            value = value.strip()

            if not value.isdigit():
                raise serializers.ValidationError(
                    "Le téléphone ne doit contenir que des chiffres."
                )

            if len(value) != 10:
                raise serializers.ValidationError(
                    "Le téléphone doit contenir exactement 10 chiffres."
                )

            if CustomUser.objects.filter(telephone=value).exists():
                raise serializers.ValidationError(
                    "Ce numéro de téléphone existe déjà."
                )

        return value

    def validate_password(self, value):

        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError(
                "Le mot de passe doit contenir au moins une majuscule."
            )

        if not re.search(r"[a-z]", value):
            raise serializers.ValidationError(
                "Le mot de passe doit contenir au moins une minuscule."
            )

        if not re.search(r"[0-9]", value):
            raise serializers.ValidationError(
                "Le mot de passe doit contenir au moins un chiffre."
            )

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise serializers.ValidationError(
                "Le mot de passe doit contenir au moins un caractère spécial."
            )

        return value

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = CustomUser(**validated_data)

        user.set_password(password)

        user.save()

        return user