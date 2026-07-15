from rest_framework import serializers


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer de changement du mot de passe
    de l'utilisateur connecté.
    """

    current_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    confirm_password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):

        if (
            attrs["new_password"]
            != attrs["confirm_password"]
        ):
            raise serializers.ValidationError({
                "confirm_password":
                "Les mots de passe ne correspondent pas."
            })

        if (
            attrs["current_password"]
            == attrs["new_password"]
        ):
            raise serializers.ValidationError({
                "new_password":
                "Le nouveau mot de passe doit être différent de l'ancien."
            })

        return attrs