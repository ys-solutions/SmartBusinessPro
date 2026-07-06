"use client";

import { Bell, LogOut, UserCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Bienvenue sur SmartBusiness Pro
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell className="text-gray-600" size={22} />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            0
          </span>
        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-blue-600"
          />

          <div>

            <div className="font-semibold text-gray-800">
              {user
                ? `${user.first_name} ${user.last_name}`.trim() ||
                  user.username
                : "Utilisateur"}
            </div>

            <div className="text-sm text-gray-500">
              Administrateur
            </div>

          </div>

        </div>

        <button
          className="text-red-600 hover:text-red-700 transition"
          title="Déconnexion"
        >
          <LogOut size={22} />
        </button>

      </div>

    </header>
  );
}