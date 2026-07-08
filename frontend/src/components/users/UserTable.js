"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

export default function UserTable({
  users = [],
  onView,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-3 text-left">Nom d'utilisateur</th>

            <th className="px-6 py-3 text-left">Nom</th>

            <th className="px-6 py-3 text-left">Email</th>

            <th className="px-6 py-3 text-left">Téléphone</th>

            <th className="px-6 py-3 text-left">Statut</th>

            <th className="px-6 py-3 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {users.length === 0 ? (

            <tr>

              <td
                colSpan="5"
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
                  {user.username}
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
                      className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-600 transition"
                      title="Modifier"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
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
  );
}