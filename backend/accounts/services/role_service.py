from core.base import BaseCrudService

from accounts.models import Role


class RoleService(BaseCrudService):
    """
    Service métier des rôles.
    """

    model = Role

    @classmethod
    def create(cls, data):

        return super().create(
            name=data["name"],
            description=data.get("description", ""),
            is_active=data.get("is_active", True),
        )

    @classmethod
    def update(cls, role, data):

        return super().update(
            role,
            name=data.get("name", role.name),
            description=data.get(
                "description",
                role.description,
            ),
            is_active=data.get(
                "is_active",
                role.is_active,
            ),
        )
    
    @classmethod
    def set_permissions(cls, role, permissions):
        """
        Attribue les permissions à un rôle.
        """

        role.permissions.set(permissions)
        role.save()

        return role