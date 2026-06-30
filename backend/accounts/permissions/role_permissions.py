from rest_framework.permissions import BasePermission


class HasPermission(BasePermission):
    """
    Permission de base basée sur les permissions
    attribuées au rôle de l'utilisateur.

    Les classes filles devront définir
    la propriété required_permission.
    """

    required_permission = None

    def has_permission(self, request, view):

        user = request.user

        if not user or not user.is_authenticated:
            return False

        if user.is_superuser:
            return True

        if user.role is None:
            return False

        if self.required_permission is None:
            return False

        return user.role.permissions.filter(
            code=self.required_permission,
            is_active=True,
        ).exists()