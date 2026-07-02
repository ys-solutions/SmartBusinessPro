from rest_framework import serializers


class BaseModelSerializer(serializers.ModelSerializer):
    """
    Classe de base de tous les ModelSerializer.
    """

    class Meta:
        abstract = True