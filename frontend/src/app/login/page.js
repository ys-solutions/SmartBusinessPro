"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/validations/loginSchema";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { authService } from "@/services/auth";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      await authService.login(data);
      router.push("/dashboard");
    } catch {
      setServerError(
        "Nom d'utilisateur ou mot de passe incorrect."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md"
      >

        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="SmartBusiness Pro"
            width={90}
            height={90}
          />
        </div>

        <h1 className="text-3xl font-bold text-center">
          SmartBusiness Pro
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Connectez-vous à votre espace
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <Input
            label="Nom d'utilisateur"
            {...register("username")}
            error={errors.username?.message}
          />

          <Input
            label="Mot de passe"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          {serverError && (
            <div className="text-red-500 text-sm">
              {serverError}
            </div>
          )}

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 text-sm text-gray-600">

              <input
                type="checkbox"
                className="rounded"
              />

              Se souvenir de moi

            </label>

            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
            >
              Mot de passe oublié ?
            </button>

          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Se connecter
          </Button>

        </form>

      </motion.div>

    </div>
  );
}