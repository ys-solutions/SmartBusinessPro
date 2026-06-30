from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

from core.constants import Messages
import traceback


def custom_exception_handler(exc, context):
    traceback.print_exc()   # <-- ajoute cette ligne

    response = exception_handler(exc, context)

    if response is None:
        return Response(
            {
                "success": False,
                "message": "Une erreur interne est survenue.",
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


    messages = {
        400: Messages.VALIDATION_ERROR,
        401: Messages.UNAUTHORIZED,
        403: Messages.FORBIDDEN,
        404: Messages.NOT_FOUND,
        405: "Méthode non autorisée.",
        500: Messages.SERVER_ERROR,
    }

    return Response(
        {
            "success": False,
            "message": messages.get(
                response.status_code,
                "Une erreur est survenue."
            ),
            "errors": response.data,
        },
        status=response.status_code,
    )