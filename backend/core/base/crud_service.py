from django.db import transaction

from core.base.service import BaseService
from core.utils import get_object


class BaseCrudService(BaseService):
    """
    Service CRUD générique.
    """

    model = None

    @classmethod
    def list(cls):
        """
        Retourne tous les objets.
        """
        return cls.model.objects.all()

    @classmethod
    def get(cls, pk):
        """
        Retourne un objet.
        """
        return get_object(
            cls.model,
            pk=pk,
        )

    @classmethod
    @transaction.atomic
    def create(cls, **kwargs):
        """
        Crée un objet.
        """
        return cls.model.objects.create(**kwargs)

    @classmethod
    @transaction.atomic
    def update(cls, instance, **kwargs):
        """
        Met à jour un objet.
        """

        for field, value in kwargs.items():
            setattr(instance, field, value)

        instance.save()

        return instance

    @classmethod
    @transaction.atomic
    def delete(cls, instance):
        """
        Supprime un objet.
        """

        instance.delete()

        return True