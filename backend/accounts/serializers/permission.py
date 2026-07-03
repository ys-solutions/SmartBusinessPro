from rest_framework import serializers

from core.base import BaseModelSerializer
from accounts.models import Permission


class PermissionSerializer(BaseModelSerializer):
    """
    Serializer des permissions.
    """

    class Meta:
        model = Permission

        fields = (
            "id",
            "module",
            "resource",
            "action",
            "name",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )

        # Désactive le validateur automatique de unique_together
        validators = []

    def validate(self, attrs):

        print("=" * 50)
        print("INSTANCE :", self.instance)
        print("INSTANCE PK :", getattr(self.instance, "pk", None))
        print("ATTRS :", attrs)

        module = attrs.get(
            "module",
            self.instance.module if self.instance else None,
        )

        resource = attrs.get(
            "resource",
            self.instance.resource if self.instance else None,
        )

        action = attrs.get(
            "action",
            self.instance.action if self.instance else None,
        )

        queryset = Permission.objects.filter(
            module=module,
            resource=resource,
            action=action,
        )

        print("QUERYSET :", list(queryset.values("id", "module", "resource", "action")))

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        print("APRES EXCLUDE :", list(queryset.values("id")))

        if queryset.exists():
            raise serializers.ValidationError(
                "Cette permission existe déjà."
            )

        return attrs