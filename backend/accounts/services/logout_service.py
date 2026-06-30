from rest_framework_simplejwt.tokens import RefreshToken

from core.base.service import BaseService


class LogoutService(BaseService):
    """
    Service responsable de la déconnexion.
    """

    @classmethod
    def execute(cls, refresh_token):
        """
        Ajoute le refresh token à la blacklist.
        """

        token = RefreshToken(refresh_token)
        token.blacklist()

        return True