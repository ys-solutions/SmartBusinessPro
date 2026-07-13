from .auth import (
    LoginView,
    RegisterView,
    MeView,
    LogoutView,
)

from .role import (
    RoleListCreateView,
    RoleDetailView,
    RolePermissionView,
)

from .permission import (
    PermissionListCreateView,
    PermissionDetailView,
)

from .user import (
    UserListCreateView,
    UserDetailView,
    UserPasswordView,
)

from .user_access import UserAccessView

from .profile import ProfileView