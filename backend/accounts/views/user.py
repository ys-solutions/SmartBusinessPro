from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from core.base import BaseAPIView
from core.responses import ApiResponse
from core.permissions import HasPermission

from accounts.models import CustomUser

from accounts.serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
    UserPasswordSerializer,
)

from accounts.services import UserService


class UserListCreateView(BaseAPIView):
    """
    Liste et création des utilisateurs.
    """

    permission_classes = [
        IsAuthenticated,
        HasPermission,
    ]

    permission_module = "accounts"
    permission_resource = "user"

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def get(self, request):

        users = UserService.list()

        serializer = UserSerializer(
            users,
            many=True,
            context={"request": request},
        )

        return ApiResponse.success(
            message="Liste des utilisateurs.",
            data=serializer.data,
        )

    def post(self, request):

        serializer = UserCreateSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = UserService.create(
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Utilisateur créé avec succès.",
            data=UserSerializer(
                user,
                context={"request": request},
            ).data,
            status_code=status.HTTP_201_CREATED,
        )


class UserDetailView(BaseAPIView):
    """
    Consultation, modification et suppression d'un utilisateur.
    """

    permission_classes = [
        IsAuthenticated,
        HasPermission,
    ]

    permission_module = "accounts"
    permission_resource = "user"

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def get(self, request, pk):

        user = UserService.get(pk)

        return ApiResponse.success(
            message="Détail de l'utilisateur.",
            data=UserSerializer(
                user,
                context={"request": request},
            ).data,
        )

    def put(self, request, pk):

        user = UserService.get(pk)

        serializer = UserUpdateSerializer(
            user,
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = UserService.update(
            user,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Utilisateur modifié avec succès.",
            data=UserSerializer(
                user,
                context={"request": request},
            ).data,
        )

    def delete(self, request, pk):

        user = UserService.get(pk)

        UserService.delete(user)

        return ApiResponse.success(
            message="Utilisateur supprimé avec succès.",
        )


class UserPasswordView(BaseAPIView):
    """
    Modification du mot de passe d'un utilisateur.
    """

    permission_classes = [
        IsAuthenticated,
        HasPermission,
    ]

    # Temporairement on utilise la permission update
    permission_module = "accounts"
    permission_resource = "user"

    def put(self, request, pk):

        user = UserService.get(pk)

        serializer = UserPasswordSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user.set_password(
            serializer.validated_data["password"]
        )

        user.save()

        return ApiResponse.success(
            message="Mot de passe modifié avec succès.",
        )