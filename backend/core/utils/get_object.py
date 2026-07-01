from django.shortcuts import get_object_or_404


def get_object(model, **filters):
    """
    Retourne un objet ou lève automatiquement une erreur 404.
    """

    return get_object_or_404(
        model,
        **filters,
    )