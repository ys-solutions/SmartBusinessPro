from rest_framework import serializers


class LogoutSerializer(serializers.Serializer):
    """
    Serializer utilisé pour la déconnexion.
    """

    refresh = serializers.CharField()