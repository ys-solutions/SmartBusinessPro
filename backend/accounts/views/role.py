from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from core.base import BaseAPIView
from core.responses import ApiResponse

from accounts.serializers import RoleSerializer
from accounts.services import RoleService


class RoleListCreateView(BaseAPIView):
    """
    Liste et création des rôles.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        roles = RoleService.list()

        serializer = RoleSerializer(
            roles,
            many=True,
        )

        return ApiResponse.success(
            message="Liste des rôles.",
            data=serializer.data,
        )

    def post(self, request):

        serializer = RoleSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        role = RoleService.create(
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Rôle créé avec succès.",
            data=RoleSerializer(role).data,
            status_code=status.HTTP_201_CREATED,
        )


class RoleDetailView(BaseAPIView):
    """
    Détail, modification et suppression d'un rôle.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        role = RoleService.get(pk)

        serializer = RoleSerializer(role)

        return ApiResponse.success(
            message="Détail du rôle.",
            data=serializer.data,
        )

    def put(self, request, pk):

        role = RoleService.get(pk)

        serializer = RoleSerializer(
            role,
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        role = RoleService.update(
            role,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Rôle modifié avec succès.",
            data=RoleSerializer(role).data,
        )

    def delete(self, request, pk):

        role = RoleService.get(pk)

        RoleService.delete(role)

        return ApiResponse.success(
            message="Rôle supprimé avec succès.",
        )