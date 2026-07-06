"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/services/api";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });

      const { user, tokens } = response.data;

      localStorage.setItem("token", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      setUser(user);

      router.push("/dashboard");

    } catch (err) {
      setError(
        err?.message ||
        "Nom d'utilisateur ou mot de passe incorrect."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            SB
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            SmartBusiness Pro
          </h1>

          <p className="text-gray-500 mt-2">
            Connectez-vous à votre espace
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-3">
              {error}
            </div>
          )}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>

            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
          >
            Mot de passe oublié ?
          </button>

        </div>

        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SmartBusiness Pro
        </div>

      </div>

    </div>
  );
}