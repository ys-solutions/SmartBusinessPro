"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import ImageUpload from "@/components/ui/ImageUpload";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import {
    User,
    Mail,
    Phone,
    Shield,
    Calendar,
} from "lucide-react";

const schema = z.object({

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
        .email("Adresse email invalide."),

    telephone: z
        .string()
        .trim()
        .regex(
            /^\d{10}$/,
            "Le téléphone doit contenir exactement 10 chiffres."
        ),

    photo: z.any().optional(),

});

export default function ProfileForm({

    user,
    onSubmit,

}) {

    const [serverErrors, setServerErrors] = useState({});

    const {

        register,

        handleSubmit,

        reset,

        watch,

        setValue,

        formState: {

            errors,

        },

    } = useForm({

        resolver: zodResolver(schema),

    });

    useEffect(() => {

        if (!user) return;

        reset({

            first_name: user.first_name || "",

            last_name: user.last_name || "",

            email: user.email || "",

            telephone: user.telephone || "",

            photo: user.photo || null,

        });

    }, [user, reset]);

    return (

        <form

            onSubmit={handleSubmit(async (data) => {

                try {

                    setServerErrors({});

                    await onSubmit(data);

                } catch (error) {

                    setServerErrors(error.errors || {});

                }

            })}

            className="space-y-6"

        >

            <div className="bg-white rounded-xl shadow p-8">

                <div className="flex flex-col items-center">

                    <ImageUpload

                        value={watch("photo")}

                        onChange={(file) =>

                            setValue("photo", file)
                        }

                    />

                    <h2 className="mt-4 text-2xl font-semibold">

                        {user.username}

                    </h2>

                    <p className="text-gray-500">

                        {user.role?.name || "-"}

                    </p>

                </div>

            </div>

            <div className="bg-white rounded-xl shadow p-8">

                <h3 className="text-lg font-semibold mb-6">

                    Informations personnelles

                </h3>

                <div className="grid grid-cols-2 gap-5">

                    <Input
                        label="Prénom"
                        icon={User}
                        error={
                            errors.first_name?.message ||
                            serverErrors.first_name?.[0]
                        }
                        {...register("first_name")}
                    />

                    <Input
                        label="Nom"
                        icon={User}
                        error={
                            errors.last_name?.message ||
                            serverErrors.last_name?.[0]
                        }
                        {...register("last_name")}
                    />

                    <Input
                        label="Email"
                        icon={Mail}
                        error={
                            errors.email?.message ||
                            serverErrors.email?.[0]
                        }
                        {...register("email")}
                    />

                    <Input
                        label="Téléphone"
                        icon={Phone}
                        error={
                            errors.telephone?.message ||
                            serverErrors.telephone?.[0]
                        }
                        {...register("telephone")}
                    />

                </div>

            </div>

            <div className="bg-white rounded-xl shadow p-8">

                <h3 className="text-lg font-semibold mb-6">

                    Informations du compte

                </h3>

                <div className="grid grid-cols-2 gap-6">

                    <div className="flex items-center gap-3">

                        <Shield
                            className="text-blue-600"
                            size={20}
                        />

                        <div>

                            <p className="text-sm text-gray-500">

                                Rôle

                            </p>

                            <p className="font-medium">

                                {user.role?.name}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Calendar
                            className="text-blue-600"
                            size={20}
                        />

                        <div>

                            <p className="text-sm text-gray-500">

                                Dernière connexion

                            </p>

                            <p className="font-medium">

                                {

                                    user.last_login

                                    ? new Date(
                                        user.last_login
                                      ).toLocaleString("fr-FR")

                                    : "-"

                                }

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Calendar
                            className="text-blue-600"
                            size={20}
                        />

                        <div>

                            <p className="text-sm text-gray-500">

                                Créé le

                            </p>

                            <p className="font-medium">

                                {

                                    new Date(
                                        user.created_at
                                    ).toLocaleDateString("fr-FR")

                                }

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="flex justify-end">

                <Button
                    type="submit"
                >
                    Enregistrer les modifications
                </Button>

            </div>

        </form>

    );

}