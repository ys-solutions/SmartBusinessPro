"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RoleForm({

    role = null,

    loading = false,

    onSubmit,

}) {

    const {

        register,

        handleSubmit,

        reset,

    } = useForm({

        defaultValues: {

            name: "",

            description: "",

            is_active: true,

        },

    });

    useEffect(() => {

        if (role) {

            reset({

                name: role.name,

                description: role.description,

                is_active: role.is_active,

            });

        } else {

            reset({

                name: "",

                description: "",

                is_active: true,

            });

        }

    }, [role, reset]);

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            <Input

                label="Nom"

                {...register("name")}

            />

            <Input

                label="Description"

                {...register("description")}

            />

            <label className="flex items-center gap-3">

                <input

                    type="checkbox"

                    {...register("is_active")}

                />

                Actif

            </label>

            <div className="flex justify-end">

                <Button

                    type="submit"

                    loading={loading}

                >

                    {

                        role

                            ? "Modifier"

                            : "Créer"

                    }

                </Button>

            </div>

        </form>

    );

}