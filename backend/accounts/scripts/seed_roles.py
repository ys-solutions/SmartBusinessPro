from accounts.models import Role, Permission

ROLES = {

    "Super Administrateur": {
        "description": "Accès complet au système.",
        "permissions": "__all__",
    },

    "Administrateur": {
        "description": "Administration générale de l'application.",
        "permissions": [
            "accounts.user.view",
            "accounts.user.create",
            "accounts.user.update",
            "accounts.user.delete",
            "accounts.user.change_password",
            "accounts.user.reset_password",
            "accounts.user.lock",
            "accounts.user.unlock",

            "accounts.role.view",
            "accounts.role.create",
            "accounts.role.update",
            "accounts.role.delete",
            "accounts.role.assign_permissions",

            "accounts.permission.view",
            "accounts.permission.create",
            "accounts.permission.update",
            "accounts.permission.delete",
        ],
    },

    "Responsable": {
        "description": "Responsable d'un service.",
        "permissions": [
            "accounts.user.view",
            "accounts.user.change_password",
        ],
    },

    "Employé": {
        "description": "Utilisateur standard.",
        "permissions": [
            "accounts.user.change_password",
        ],
    },

    "Consultation": {
        "description": "Lecture seule.",
        "permissions": [
            "accounts.user.view",
        ],
    },

}

created = 0
updated = 0

for role_name, config in ROLES.items():

    role, is_created = Role.objects.get_or_create(

        name=role_name,

        defaults={
            "description": config["description"],
            "is_active": True,
        },

    )

    if is_created:

        created += 1

    else:

        role.description = config["description"]
        role.is_active = True
        role.save()

        updated += 1

    role.permissions.clear()

    if config["permissions"] == "__all__":

        role.permissions.set(
            Permission.objects.filter(
                is_active=True
            )
        )

    else:

        permissions = Permission.objects.filter(

            name__in=config["permissions"],
            is_active=True,

        )

        role.permissions.set(permissions)

print("=" * 50)
print(f"Rôles créés        : {created}")
print(f"Rôles mis à jour   : {updated}")
print("=" * 50)