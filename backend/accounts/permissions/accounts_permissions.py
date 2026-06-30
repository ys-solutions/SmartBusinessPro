from accounts.permissions.role_permissions import HasPermission
from core.constants import Permissions


class CanCreateUser(HasPermission):
    required_permission = Permissions.USER_CREATE


class CanUpdateUser(HasPermission):
    required_permission = Permissions.USER_UPDATE


class CanDeleteUser(HasPermission):
    required_permission = Permissions.USER_DELETE


class CanViewUser(HasPermission):
    required_permission = Permissions.USER_VIEW