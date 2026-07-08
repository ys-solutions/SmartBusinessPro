"use client";

import Modal from "@/components/common/Modal";

export default function UserDetail({
  open,
  user,
  onClose,
}) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Informations de l'utilisateur"
    >

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500 text-sm">
            Nom d'utilisateur
          </p>

          <p className="font-semibold">
            {user.username}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Nom complet
          </p>

          <p className="font-semibold">
            {user.first_name} {user.last_name}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p className="font-semibold">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Téléphone
          </p>

          <p className="font-semibold">
            {user.telephone || "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Statut
          </p>

          <p className="font-semibold">
            {user.is_active ? "Actif" : "Inactif"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Dernière connexion
          </p>

          <p className="font-semibold">
            {user.last_login || "-"}
          </p>
        </div>

      </div>

    </Modal>
  );
}