from django.urls import path

from accounts.views import LoginView, RegisterView
from accounts.views import MeView
from accounts.views import LogoutView

from accounts.views import (
    RoleListCreateView,
    RoleDetailView,
    RolePermissionView,
)

urlpatterns = [
    # Auth
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("me/", MeView.as_view(), name="me"),
    path("logout/", LogoutView.as_view(), name="logout"),

    # Roles
    path("roles/", RoleListCreateView.as_view(), name="role-list"),
    path("roles/<int:pk>/", RoleDetailView.as_view(), name="role-detail"),
    path(
        "roles/<int:pk>/permissions/",
        RolePermissionView.as_view(),
        name="role-permissions",
    ),
]