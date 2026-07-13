from accounts.models import CustomUser


class ProfileService:
    """
    Service de gestion du profil utilisateur.
    """

    @staticmethod
    def get(user: CustomUser):
        """
        Retourne le profil de l'utilisateur connecté.
        """
        return user

    @staticmethod
    def update(user: CustomUser, validated_data: dict):
        """
        Met à jour le profil de l'utilisateur connecté.
        """

        for field, value in validated_data.items():
            setattr(user, field, value)

        user.save()

        return user