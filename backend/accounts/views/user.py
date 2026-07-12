from rest_framework import status
from accounts.permissions import HasPermission
from core.constants.permissions import Permissions
from rest_framework.permissions import IsAuthenticated
from core.base import BaseAPIView
from core.responses import ApiResponse
from accounts.serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
)

from accounts.services import UserService
from accounts.serializers import UserPasswordSerializer
from django.shortcuts import get_object_or_404
from accounts.models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser

class UserListCreateView(BaseAPIView):
  
    permission_classes = [IsAuthenticated]

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
            data=UserSerializer(user).data,
            status_code=status.HTTP_201_CREATED,
        )

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated(), HasPermission()]
        if self.request.method == "POST":
            self.permission_required = Permissions.USER_CREATE
            return [IsAuthenticated(), HasPermission()]

class UserDetailView(BaseAPIView):
  
    permission_classes = [IsAuthenticated]

    parser_classes = (
        MultiPartParser,
        FormParser,
    )


    def get(self, request, pk):

        user = UserService.get(pk)

        serializer = UserSerializer(
            user,
            context={"request": request},
        )

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
            data=UserSerializer(user).data,
        )

    def delete(self, request, pk):

        user = UserService.get(pk)

        UserService.delete(user)

        return ApiResponse.success(
            message="Utilisateur supprimé avec succès.",
        )

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_required = Permissions.USER_VIEW
        elif self.request.method == "PUT":
            self.permission_required = Permissions.USER_UPDATE
        elif self.request.method == "DELETE":
            self.permission_required = Permissions.USER_DELETE

        return [IsAuthenticated(), HasPermission()]
    

class UserPasswordView(BaseAPIView):

    permission_classes = [IsAuthenticated]

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

    def get_permissions(self):

        self.permission_required = Permissions.USER_UPDATE

        return [
            IsAuthenticated(),
            HasPermission(),
        ]