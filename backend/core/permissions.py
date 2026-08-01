from rest_framework.permissions import BasePermission


class HasPermission(BasePermission):
    """
    Vérifie automatiquement les permissions selon
    la méthode HTTP.
    """

    message = "Vous ne disposez pas des droits nécessaires."

    ACTIONS = {
        "GET": "view",
        "POST": "create",
        "PUT": "update",
        "PATCH": "update",
        "DELETE": "delete",
    }

    def has_permission(self, request, view):

        module = getattr(view, "permission_module", None)
        resource = getattr(view, "permission_resource", None)

        if not module or not resource:
            return True

        action = self.ACTIONS.get(request.method)

        if action is None:
            return True

        permission_code = f"{module}.{resource}.{action}"

        return request.user.has_permission(permission_code)