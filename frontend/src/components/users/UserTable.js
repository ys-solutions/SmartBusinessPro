"use client";

import { useState } from "react";

import {
  Eye,
  ShieldCheck,
  Trash2,
  KeyRound,
} from "lucide-react";

import ImagePreviewModal from "@/components/common/ImagePreviewModal";

export default function UserTable({
  users = [],
  onView,
  onAccess,
  onPassword,
  onDelete,
}) {

  const [preview, setPreview] = useState(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-3 text-left">
                Utilisateur
              </th>

              <th className="px-6 py-3 text-left">
                Nom complet
              </th>

              <th className="px-6 py-3 text-left">
                Email
              </th>

              <th className="px-6 py-3 text-left">
                Téléphone
              </th>

              <th className="px-6 py-3 text-left">
                Rôle
              </th>

              <th className="px-6 py-3 text-left">
                Statut
              </th>

              <th className="px-6 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  Aucun utilisateur.
                </td>

              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      {user.photo ? (

                        <img
                          src={user.photo}
                          alt={user.username}
                          onClick={() => setPreview(user.photo)}
                          className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:scale-105 transition"
                        />

                      ) : (

                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

                          {(
                            (user.first_name?.charAt(0) || "") +
                            (user.last_name?.charAt(0) || "")
                          ).toUpperCase()}

                        </div>

                      )}

                      <div>

                        <div className="font-medium">
                          {user.username}
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    {user.first_name} {user.last_name}

                  </td>

                  <td className="px-6 py-4">

                    {user.email}

                  </td>

                  <td className="px-6 py-4">

                    {user.telephone}

                  </td>

                  <td className="px-6 py-4">

                    {user.role_name || user.role?.name || "-"}

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.is_active ? "Actif" : "Inactif"}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onView(user)}
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                        title="Voir"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onAccess(user)}
                        className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 transition"
                        title="Gérer les accès"
                      >
                        <ShieldCheck size={18} />
                      </button>

                      <button
                        onClick={() => onPassword(user)}
                        className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-600 transition"
                        title="Réinitialiser le mot de passe"
                      >
                        <KeyRound size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(user)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <ImagePreviewModal
        open={!!preview}
        image={preview}
        title="Photo de l'utilisateur"
        onClose={() => setPreview(null)}
      />

    </>
  );
}