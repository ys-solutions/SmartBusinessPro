"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import Modal from "@/components/common/Modal";

const schema = z.object({

  username: z.string().min(3, "Minimum 3 caractères"),

  first_name: z.string().min(2, "Obligatoire"),

  last_name: z.string().min(2, "Obligatoire"),

  email: z.string().email("Email invalide"),

  telephone: z.string().optional(),

  password: z.string().min(6, "Minimum 6 caractères"),

  confirm_password: z.string(),

}).refine(

  (data) => data.password === data.confirm_password,

  {

    message: "Les mots de passe ne correspondent pas",

    path: ["confirm_password"],

  }

);

export default function UserForm({

  open,

  onClose,

  onSubmit,

  user,

}) {

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

    }

    else {

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

  }, [user, reset]);

  return (

    <Modal

      open={open}

      onClose={onClose}

      title={user ? "Modifier utilisateur" : "Nouvel utilisateur"}

    >

      <form

        onSubmit={handleSubmit(onSubmit)}

        className="space-y-5"

      >

        <div>

          <label>Nom d'utilisateur</label>

          <input

            {...register("username")}

            className="w-full border rounded-lg px-3 py-2"

          />

          <p className="text-red-500 text-sm">

            {errors.username?.message}

          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label>Prénom</label>

            <input

              {...register("first_name")}

              className="w-full border rounded-lg px-3 py-2"

            />

            <p className="text-red-500 text-sm">

              {errors.first_name?.message}

            </p>

          </div>

          <div>

            <label>Nom</label>

            <input

              {...register("last_name")}

              className="w-full border rounded-lg px-3 py-2"

            />

            <p className="text-red-500 text-sm">

              {errors.last_name?.message}

            </p>

          </div>

        </div>

        <div>

          <label>Email</label>

          <input

            {...register("email")}

            className="w-full border rounded-lg px-3 py-2"

          />

          <p className="text-red-500 text-sm">

            {errors.email?.message}

          </p>

        </div>

        <div>

          <label>Téléphone</label>

          <input

            {...register("telephone")}

            className="w-full border rounded-lg px-3 py-2"

          />

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label>Mot de passe</label>

            <input

              type="password"

              {...register("password")}

              className="w-full border rounded-lg px-3 py-2"

            />

            <p className="text-red-500 text-sm">

              {errors.password?.message}

            </p>

          </div>

          <div>

            <label>Confirmation</label>

            <input

              type="password"

              {...register("confirm_password")}

              className="w-full border rounded-lg px-3 py-2"

            />

            <p className="text-red-500 text-sm">

              {errors.confirm_password?.message}

            </p>

          </div>

        </div>

        <div className="flex justify-end gap-3">

          <button

            type="button"

            onClick={onClose}

            className="px-4 py-2 border rounded-lg"

          >

            Annuler

          </button>

          <button

            type="submit"

            className="px-5 py-2 bg-blue-600 text-white rounded-lg"

          >

            Enregistrer

          </button>

        </div>

      </form>

    </Modal>

  );

}