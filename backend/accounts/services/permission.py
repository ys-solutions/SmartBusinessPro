from core.base import BaseCrudService

from accounts.models import Permission


class PermissionService(BaseCrudService):
    """
    Service métier des permissions.
    """

    model = Permission

    @classmethod
    def create(cls, data):

        return super().create(
            module=data["module"],
            resource=data["resource"],
            action=data["action"],
            name=data["name"],
            description=data.get("description", ""),
            is_active=data.get("is_active", True),
        )

    @classmethod
    def update(cls, permission, data):

        return super().update(
            permission,
            module=data.get("module", permission.module),
            resource=data.get("resource", permission.resource),
            action=data.get("action", permission.action),
            name=data.get("name", permission.name),
            description=data.get(
                "description",
                permission.description,
            ),
            is_active=data.get(
                "is_active",
                permission.is_active,
            ),
        )