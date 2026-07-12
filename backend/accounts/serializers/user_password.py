import re

from rest_framework import serializers


class UserPasswordSerializer(serializers.Serializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    confirm_password = serializers.CharField(
        write_only=True,
    )

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

        if not re.search(
            r"[!@#$%^&*(),.?\":{}|<>]",
            value,
        ):
            raise serializers.ValidationError(
                "Le mot de passe doit contenir au moins un caractère spécial."
            )

        return value

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:

            raise serializers.ValidationError(
                {
                    "confirm_password":
                    "Les mots de passe ne correspondent pas."
                }
            )

        return attrs