from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from core.base import BaseAPIView

from accounts.serializers import LoginSerializer
from accounts.services.auth_service import AuthService

from accounts.services.user_service import UserService

from core.responses import ApiResponse

from core.constants import Messages
from core.responses import ApiResponse

from rest_framework.permissions import IsAuthenticated

from accounts.serializers import UserSerializer

from accounts.serializers import LogoutSerializer
from accounts.services import LogoutService



class LoginView(BaseAPIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        tokens = AuthService.execute(user)

        return ApiResponse.success(
            message=Messages.LOGIN_SUCCESS,
            data={
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                },
                "tokens": tokens,
            },
        )

class RegisterView(BaseAPIView):
    """
    API d'inscription.
    """

    permission_classes = [AllowAny]

    def post(self, request):

        user = UserService.create_user(request.data)

        tokens = AuthService.generate_tokens(user)

        return ApiResponse.success(
            message=Messages.REGISTER_SUCCESS,
            data={
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                },
                "tokens": tokens,
            },
            status_code=status.HTTP_201_CREATED,
        )
    
class MeView(BaseAPIView):
    """
    Retourne les informations de l'utilisateur connecté.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return ApiResponse.success(
            message=Messages.PROFILE_SUCCESS,
            data=serializer.data,
        )


class LogoutView(BaseAPIView):
    """
    API de déconnexion.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        LogoutService.execute(
            serializer.validated_data["refresh"]
        )

        return ApiResponse.success(
            message=Messages.LOGOUT_SUCCESS
        )