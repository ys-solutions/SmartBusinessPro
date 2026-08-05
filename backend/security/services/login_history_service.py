from security.models import LoginHistory


class LoginHistoryService:
    """
    Gestion de l'historique des connexions.
    """

    @staticmethod
    def create(
        *,
        user=None,
        username="",
        request=None,
        status="SUCCESS",
        failure_reason="",
    ):
        """
        Enregistre une tentative de connexion.
        """

        ip_address = None
        user_agent = ""
        browser = ""
        operating_system = ""
        device = ""

        if request:

            ip_address = (
                request.META.get("HTTP_X_FORWARDED_FOR")
                or request.META.get("REMOTE_ADDR")
            )

            user_agent = request.META.get(
                "HTTP_USER_AGENT",
                "",
            )

            # Nous parserons automatiquement le navigateur,
            # le système et l'appareil un peu plus tard.

        return LoginHistory.objects.create(
            user=user,
            username=username,
            ip_address=ip_address,
            user_agent=user_agent,
            browser=browser,
            operating_system=operating_system,
            device=device,
            status=status,
            failure_reason=failure_reason,
        )