from django.urls import path

from accounts.views import LoginView, RegisterView
from accounts.views import MeView
from accounts.views import LogoutView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("me/", MeView.as_view(), name="me"),
    path("logout/", LogoutView.as_view(), name="logout"),
]