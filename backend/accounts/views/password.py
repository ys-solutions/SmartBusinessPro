from rest_framework.permissions import IsAuthenticated

from core.base import BaseAPIView
from core.responses import ApiResponse

from accounts.serializers import ChangePasswordSerializer
from accounts.services import PasswordService


class PasswordView(BaseAPIView):
    """
    Changement du mot de passe de
    l'utilisateur connecté.
    """

    permission_classes = [IsAuthenticated]

    def put(self, request):

        serializer = ChangePasswordSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        PasswordService.change_password(
            request.user,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Mot de passe modifié avec succès.",
        )