"use client";

import { Plus, Download } from "lucide-react";

export default function UserToolbar({
  search,
  setSearch,
  onCreate,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex gap-3">

          <button
            onClick={onCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Nouvel utilisateur
          </button>

          <button
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <Download size={18} />
            Export
          </button>

        </div>

      </div>

    </div>
  );
}