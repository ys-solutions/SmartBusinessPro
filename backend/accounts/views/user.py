from rest_framework import status
from accounts.permissions import HasPermission
from core.constants.permissions import Permissions
from rest_framework.permissions import IsAuthenticated

from core.base import BaseAPIView
from core.responses import ApiResponse



from accounts.serializers import (
    UserSerializer,
    UserCreateSerializer,
)

from accounts.services import UserService


class UserListCreateView(BaseAPIView):
    """
    Liste et création des utilisateurs.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        users = UserService.list()

        serializer = UserSerializer(
            users,
            many=True,
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
    """
    Détail, modification et suppression d'un utilisateur.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        user = UserService.get(pk)

        serializer = UserSerializer(user)

        return ApiResponse.success(
            message="Détail de l'utilisateur.",
            data=serializer.data,
        )

    def put(self, request, pk):

        user = UserService.get(pk)

        serializer = UserCreateSerializer(
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