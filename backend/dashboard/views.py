from rest_framework.permissions import IsAuthenticated

from core.base import BaseAPIView
from core.responses import ApiResponse

from .services import DashboardService


class DashboardStatsView(BaseAPIView):
    """
    Statistiques du tableau de bord.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        data = DashboardService.get_stats()

        return ApiResponse.success(
            message="Statistiques récupérées.",
            data=data,
        )