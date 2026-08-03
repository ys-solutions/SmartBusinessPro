from accounts.models import Permission

PERMISSIONS = [

    # ==========================
    # USERS
    # ==========================

    ("accounts", "user", "view", "Consulter les utilisateurs"),
    ("accounts", "user", "create", "Créer un utilisateur"),
    ("accounts", "user", "update", "Modifier un utilisateur"),
    ("accounts", "user", "delete", "Supprimer un utilisateur"),
    ("accounts", "user", "change_password", "Changer le mot de passe d'un utilisateur"),
    ("accounts", "user", "reset_password", "Réinitialiser le mot de passe"),
    ("accounts", "user", "lock", "Verrouiller un utilisateur"),
    ("accounts", "user", "unlock", "Déverrouiller un utilisateur"),

    # ==========================
    # ROLES
    # ==========================

    ("accounts", "role", "view", "Consulter les rôles"),
    ("accounts", "role", "create", "Créer un rôle"),
    ("accounts", "role", "update", "Modifier un rôle"),
    ("accounts", "role", "delete", "Supprimer un rôle"),
    ("accounts", "role", "assign_permissions", "Attribuer les permissions à un rôle"),

    # ==========================
    # PERMISSIONS
    # ==========================

    ("accounts", "permission", "view", "Consulter les permissions"),
    ("accounts", "permission", "create", "Créer une permission"),
    ("accounts", "permission", "update", "Modifier une permission"),
    ("accounts", "permission", "delete", "Supprimer une permission"),
]

created = 0
updated = 0

for module, resource, action, description in PERMISSIONS:

    name = f"{module}.{resource}.{action}"

    permission, is_created = Permission.objects.get_or_create(

        module=module,
        resource=resource,
        action=action,

        defaults={

            "name": name,
            "description": description,

        }

    )

    if is_created:

        created += 1

    else:

        permission.name = name
        permission.description = description
        permission.save()

        updated += 1

print("=" * 50)
print(f"Permissions créées   : {created}")
print(f"Permissions mises à jour : {updated}")
print("=" * 50)