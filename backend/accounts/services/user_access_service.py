from accounts.models import CustomUser


class UserAccessService:
    """
    Service de gestion des accès utilisateur.
    """

    @staticmethod
    def update(user: CustomUser, data):

        user.role = data["role"]
        user.is_active = data["is_active"]
        user.is_locked = data["is_locked"]
        user.must_change_password = data["must_change_password"]

        user.save()

        return user