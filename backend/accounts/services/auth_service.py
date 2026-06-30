from rest_framework_simplejwt.tokens import RefreshToken

from core.base import BaseService


class AuthService(BaseService):
    """
    Services liés à l'authentification.
    """

    @staticmethod
    def generate_tokens(user):
        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }

    @classmethod
    def execute(cls, user):
        return cls.generate_tokens(user)