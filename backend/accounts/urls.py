from django.urls import path

from accounts.views import ( 
    LoginView, 
    RegisterView,
    MeView,
    ProfileView,
    LogoutView
)

from accounts.views import (
    RoleListCreateView,
    RoleDetailView,
    RolePermissionView,
)

from accounts.views import (
    PermissionListCreateView,
    PermissionDetailView,
)

from accounts.views import (
    UserListCreateView,
    UserDetailView,
    UserPasswordView,
    UserAccessView,
)


urlpatterns = [
    # Auth
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("me/", MeView.as_view(), name="me"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("logout/", LogoutView.as_view(), name="logout"),

    # Roles
    path("roles/", RoleListCreateView.as_view(), name="role-list"),
    path("roles/<int:pk>/", RoleDetailView.as_view(), name="role-detail"),
    path("roles/<int:pk>/permissions/",RolePermissionView.as_view(),name="role-permissions",),
    
    # Permissions
    path("permissions/",PermissionListCreateView.as_view(),name="permission-list",),
    path("permissions/<int:pk>/",PermissionDetailView.as_view(),name="permission-detail",),

    path("users/",UserListCreateView.as_view(),name="user-list",),
    path("users/<int:pk>/",UserDetailView.as_view(),name="user-detail",),

    path("users/<int:pk>/change-password/",UserPasswordView.as_view(),name="user-change-password",),

    path("users/<int:pk>/access/",UserAccessView.as_view(),name="user-access",),
]