from rest_framework.permissions import IsAuthenticated

from core.base import BaseAPIView
from core.responses import ApiResponse

from accounts.permissions import HasPermission
from core.constants.permissions import Permissions

from accounts.services import (
    UserService,
    UserAccessService,
)

from accounts.serializers import (
    UserSerializer,
    UserAccessSerializer,
)


class UserAccessView(BaseAPIView):
    """
    Gestion des accès d'un utilisateur.
    """

    permission_classes = [
        IsAuthenticated,
    ]

    def put(self, request, pk):

        user = UserService.get(pk)

        serializer = UserAccessSerializer(
            user,
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = UserAccessService.update(
            user,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Accès utilisateur mis à jour.",
            data=UserSerializer(user).data,
        )

    def get_permissions(self):

        self.permission_required = Permissions.USER_UPDATE

        return [
            IsAuthenticated(),
            HasPermission(),
        ]