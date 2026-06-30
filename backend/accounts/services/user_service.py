from accounts.serializers import RegisterSerializer


class UserService:
    """
    Service responsable de la gestion des utilisateurs.
    """

    @staticmethod
    def create_user(data):
        serializer = RegisterSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()