class BaseService:
    """
    Classe de base de tous les services.

    Tous les services métiers de Smart Business Pro
    hériteront de cette classe.
    """

    @classmethod
    def execute(cls, *args, **kwargs):
        raise NotImplementedError(
            "Chaque service doit implémenter execute()."
        )