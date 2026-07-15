from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

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
        try:

            validate_password(
                new_password,
                user,
            )

        except DjangoValidationError as e:

            raise ValidationError({
                "new_password": e.messages
            })

        # Mise à jour
        user.set_password(new_password)
        user.save()

        return user