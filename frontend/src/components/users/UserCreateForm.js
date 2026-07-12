"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import Modal from "@/components/common/Modal";

import Input from "@/components/ui/Input";

import Button from "@/components/ui/Button";

import { User, Mail, Phone, Shield } from "lucide-react";

import { roleService } from "@/services/role";

export default function UserCreateForm({

    open,

    onClose,

    onSubmit,

}) {

    const [roles, setRoles] = useState([]);

    const [serverErrors, setServerErrors] = useState({});

    const schema = z.object({

        username: z

            .string()

            .trim()

            .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères.")

            .max(30)

            .regex(

                /^[A-Za-z0-9._]+$/,

                "Caractères non autorisés."

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

        role: z.coerce

            .number({

                required_error: "Le rôle est obligatoire."

            })

            .min(1),

    });

    const {

        register,

        handleSubmit,

        reset,

        formState: { errors },

    } = useForm({

        resolver: zodResolver(schema),

    });

    useEffect(() => {

        reset({

            username: "",

            first_name: "",

            last_name: "",

            email: "",

            telephone: "",

            role: "",

        });

        setServerErrors({});

    }, [open, reset]);

    useEffect(() => {

        const loadRoles = async () => {

            try {

                const response = await roleService.getAll();

                if (response.success) {

                    setRoles(response.data);

                }

            } catch (error) {

                console.error(error);

            }

        };

        loadRoles();

    }, []);

    return (

        <Modal

            open={open}

            onClose={onClose}

            title="Nouvel utilisateur"

        >

            <form

                onSubmit={handleSubmit(async (data) => {

                    try {

                        setServerErrors({});

                        await onSubmit(data);

                    }

                    catch (error) {

                        setServerErrors(error.errors || {});

                    }

                })}

            >

                <Input

                    label="Nom d'utilisateur"

                    icon={User}

                    error={

                        errors.username?.message ||

                        serverErrors.username?.[0]

                    }

                    {...register("username")}

                />

                <div className="grid grid-cols-2 gap-4 mt-4">

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

                </div>

                <div className="mt-4">

                    <Input

                        label="Email"

                        icon={Mail}

                        type="email"

                        error={

                            errors.email?.message ||

                            serverErrors.email?.[0]

                        }

                        {...register("email")}

                    />

                </div>

                <div className="mt-4">

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

                <div className="mt-4">

                    <label className="block mb-2 text-sm font-medium">

                        Rôle

                    </label>

                    <select

                        {...register("role")}

                        className="w-full border rounded-lg px-3 py-2"

                    >

                        <option value="">

                            -- Sélectionner --

                        </option>

                        {

                            roles.map(role => (

                                <option

                                    key={role.id}

                                    value={role.id}

                                >

                                    {role.name}

                                </option>

                            ))

                        }

                    </select>

                    <p className="text-red-500 text-sm mt-1">

                        {

                            errors.role?.message ||

                            serverErrors.role?.[0]

                        }

                    </p>

                </div>

                <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-700">

                    Un mot de passe temporaire sera généré automatiquement et envoyé à l'utilisateur.

                </div>

                <div className="flex justify-end gap-3 mt-6">

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

                        Créer l'utilisateur

                    </Button>

                </div>

            </form>

        </Modal>

    );

}