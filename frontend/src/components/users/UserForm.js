"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Modal from "@/components/common/Modal";

import Input from "@/components/ui/Input";
import { User, Mail, Phone, Lock  } from "lucide-react";

import Button from "@/components/ui/Button";

export default function UserForm({ open, onClose, onSubmit, user }) {
  const [serverErrors, setServerErrors] = useState({});
  const schema = z
    .object({
      username: z
        .string()
        .trim()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères.")
        .max(30, "Le nom d'utilisateur ne peut pas dépasser 30 caractères.")
        .regex(
          /^[A-Za-z0-9._]+$/,
          "Seuls les lettres, chiffres, '.' et '_' sont autorisés."
        ),

      first_name: z
        .string()
        .trim()
        .min(2, "Le prénom est obligatoire."),

      last_name: z
        .string()
        .trim()
        .min(2, "Le nom est obligatoire."),

      email: z
        .string()
        .trim()
        .email("Adresse email invalide."),

      telephone: z
        .string()
        .trim()
        .regex(
          /^\d{10}$/,
          "Le téléphone doit contenir exactement 10 chiffres."
        ),

      password: user
        ? z.string().optional()
        : z
            .string()
            .min(8, "Minimum 8 caractères.")
            .regex(/[A-Z]/, "Une majuscule est obligatoire.")
            .regex(/[a-z]/, "Une minuscule est obligatoire.")
            .regex(/[0-9]/, "Un chiffre est obligatoire.")
            .regex(
              /[!@#$%^&*(),.?":{}|<>]/,
              "Un caractère spécial est obligatoire."
            ),

      confirm_password: z.string(),
    })
    .refine(
      (data) => {
        if (!data.password) return true;

        return data.password === data.confirm_password;
      },
      {
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirm_password"],
      }
    );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        password: "",
        confirm_password: "",
      });
    } else {
      reset({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        password: "",
        confirm_password: "",
      });
    }
    setServerErrors({});
  }, [user]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={user ? "Modifier utilisateur" : "Nouvel utilisateur"}
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setServerErrors({});
            await onSubmit(data);
          }catch (error) {
              setServerErrors(error?.errors || {});
          }
        })}
      >
        <div> 
          <label>Nom utilisateur</label> 
          <Input label="Nom utilisateur" 
              required icon={User} 
              error={ 
                errors.username?.message || 
                serverErrors.username?.[0] 
              } 
              {...register("username")} /> 
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label="Prénom"
              icon={User}
              error={
                errors.first_name?.message ||
                serverErrors.first_name?.[0]
              }
              {...register("first_name")}
            />
          </div>

          <div>
            <Input
              label="Nom"
              icon={User}
              error={
                errors.last_name?.message ||
                serverErrors.last_name?.[0]
              }
              {...register("last_name")}
            />
          </div>
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            icon={Mail}
            error={
              errors.email?.message ||
              serverErrors.email?.[0]
            }
            {...register("email")}
          />
        </div>

        <div>
          <Input
            label="Téléphone"
            type="tel"
            icon={Phone}
            error={
              errors.telephone?.message ||
              serverErrors.telephone?.[0]
            }
            {...register("telephone")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              label="Mot de passe"
              type="password"
              icon={Lock}
              error={
                errors.password?.message ||
                serverErrors.password?.[0]
              }
              {...register("password")}
            />
          </div>

          <div>
            <Input
              label="Confirmation"
              type="password"
              icon={Lock}
              error={
                errors.confirm_password?.message ||
                serverErrors.confirm_password?.[0]
              }
              {...register("confirm_password")}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Annuler
          </Button>

          <Button
            type="submit"
            variant="primary"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}