from rest_framework.permissions import IsAuthenticated

from core.base import BaseAPIView
from core.responses import ApiResponse

from accounts.serializers import ProfileSerializer
from accounts.services import ProfileService
from rest_framework.parsers import MultiPartParser, FormParser


class ProfileView(BaseAPIView):
    """
    Consultation et modification du profil utilisateur connecté.
    """

    permission_classes = [IsAuthenticated]

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def get(self, request):

        serializer = ProfileSerializer(
            ProfileService.get(request.user)
        )

        return ApiResponse.success(
            message="Profil utilisateur.",
            data=serializer.data,
        )

    def put(self, request):

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = ProfileService.update(
            request.user,
            serializer.validated_data,
        )

        return ApiResponse.success(
            message="Profil mis à jour avec succès.",
            data=ProfileSerializer(user).data,
        )