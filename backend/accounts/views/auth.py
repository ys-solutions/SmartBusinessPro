from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from core.base import BaseAPIView
from core.constants import Messages
from core.responses import ApiResponse

from accounts.serializers import (
    LoginSerializer,
    LogoutSerializer,
    UserSerializer,
)

from accounts.services.auth_service import AuthService
from accounts.services.user_service import UserService
from accounts.services import LogoutService

from security.services import LoginHistoryService

from security.services import LoginHistoryService


class LoginView(BaseAPIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        try:

            serializer.is_valid(raise_exception=True)

        except Exception:

            LoginHistoryService.create(
                username=request.data.get("username", ""),
                request=request,
                status="FAILED",
                failure_reason="Identifiant ou mot de passe incorrect.",
            )

            raise

        user = serializer.validated_data["user"]

        tokens = AuthService.execute(user)

        LoginHistoryService.create(
            user=user,
            username=user.username,
            request=request,
            status="SUCCESS",
        )

        return ApiResponse.success(
            message=Messages.LOGIN_SUCCESS,
            data={
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "role": user.role.name if user.role else None,
                },
                "permissions": [
                    permission.name
                    for permission in user.role.permissions.filter(
                        is_active=True
                    )
                ] if user.role else [],
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

        serializer = LogoutSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        LogoutService.execute(
            serializer.validated_data["refresh"]
        )

        LoginHistoryService.logout(request.user)
        
        return ApiResponse.success(
            message=Messages.LOGOUT_SUCCESS,
        )