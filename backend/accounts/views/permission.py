from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from core.base import BaseAPIView
from core.responses import ApiResponse

from accounts.serializers import PermissionSerializer
from accounts.services import PermissionService


class PermissionListCreateView(BaseAPIView):
    """
    Liste et création des permissions.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        permissions = PermissionService.list()

        serializer = PermissionSerializer(
            permissions,
            many=True,
        )

        return ApiResponse.success(
            message="Liste des permissions.",
            data=serializer.data,
        )

    def post(self, request):

        serializer = PermissionSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        permission = PermissionService.create(
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Permission créée avec succès.",
            data=PermissionSerializer(permission).data,
            status_code=status.HTTP_201_CREATED,
        )


class PermissionDetailView(BaseAPIView):
    """
    Détail, modification et suppression d'une permission.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        permission = PermissionService.get(pk)

        serializer = PermissionSerializer(permission)

        return ApiResponse.success(
            message="Détail de la permission.",
            data=serializer.data,
        )

    def put(self, request, pk):

        permission = PermissionService.get(pk)

        serializer = PermissionSerializer(
            permission,
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        permission = PermissionService.update(
            permission,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Permission modifiée avec succès.",
            data=PermissionSerializer(permission).data,
        )

    def delete(self, request, pk):

        permission = PermissionService.get(pk)

        PermissionService.delete(permission)

        return ApiResponse.success(
            message="Permission supprimée avec succès.",
        )