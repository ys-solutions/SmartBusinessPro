from rest_framework.permissions import BasePermission


class HasPermission(BasePermission):
    """
    Permission basée sur le rôle de l'utilisateur.
    """

    required_permission = None

    def has_permission(self, request, view):

        user = request.user

        # Utilisateur non connecté
        if not user or not user.is_authenticated:
            return False

        # Le superutilisateur possède toutes les permissions
        if user.is_superuser:
            return True

        # Récupère le rôle de manière sécurisée
        role = getattr(user, "role", None)

        if role is None:
            return False

        # Aucune permission demandée
        if not self.required_permission:
            return False

        # Vérifie la permission
        return role.has_permission(
            self.required_permission
        )