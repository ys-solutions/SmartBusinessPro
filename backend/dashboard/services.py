from accounts.models import CustomUser


class DashboardService:
    """
    Service du Dashboard.
    """

    @staticmethod
    def get_stats():

        return {
            "users": CustomUser.objects.count(),
            "clients": 0,
            "products": 0,
            "accounts": 0,
            "transactions": 0,
            "employees": 0,
        }