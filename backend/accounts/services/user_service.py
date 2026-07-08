from core.base import BaseCrudService

from accounts.models import CustomUser


class UserService(BaseCrudService):
    """
    Service métier des utilisateurs.
    """

    model = CustomUser

    @classmethod
    def create(cls, data):

        return cls.model.objects.create_user(
            username=data["username"],
            password=data["password"],
            first_name=data.get("first_name", ""),
            last_name=data.get("last_name", ""),
            email=data.get("email", ""),
            telephone=data.get("telephone", ""),
            photo=data.get("photo"),
            role=data.get("role"),
            is_active=data.get("is_active", True),
        )

    @classmethod
    def update(cls, user, data):

        for field in (
            "username",
            "first_name",
            "last_name",
            "email",
            "telephone",
            "photo",
            "role",
            "is_active",
        ):
            if field in data:
                setattr(user, field, data[field])

        if data.get("password"):
            user.set_password(data["password"])

        user.save()

        return user
    
    @staticmethod
    def get_all_users():

        from accounts.models import CustomUser

        return CustomUser.objects.all().order_by("-id")