from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError

from accounts.models import CustomUser


class PasswordService:
    """
    Service de changement du mot de passe
    de l'utilisateur connecté.
    """

    @staticmethod
    def change_password(user: CustomUser, validated_data: dict):

        current_password = validated_data["current_password"]
        new_password = validated_data["new_password"]

        # Vérifie l'ancien mot de passe
        if not user.check_password(current_password):
            raise ValidationError({
                "current_password": [
                    "Le mot de passe actuel est incorrect."
                ]
            })

        # Validation Django
        validate_password(new_password, user)

        # Mise à jour
        user.set_password(new_password)
        user.save()

        return user