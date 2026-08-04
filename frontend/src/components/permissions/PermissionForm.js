"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PermissionForm({

    permission = null,

    loading = false,

    onSubmit,

}) {

    const {

        register,

        handleSubmit,

        reset,

    } = useForm({

        defaultValues: {

            module: "",

            resource: "",

            action: "",

            name: "",

            description: "",

            is_active: true,

        },

    });

    useEffect(() => {

        if (permission) {

            reset({

                module: permission.module,

                resource: permission.resource,

                action: permission.action,

                name: permission.name,

                description: permission.description,

                is_active: permission.is_active,

            });

        } else {

            reset({

                module: "",

                resource: "",

                action: "",

                name: "",

                description: "",

                is_active: true,

            });

        }

    }, [permission, reset]);

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            <Input
                label="Module"
                {...register("module")}
            />

            <Input
                label="Ressource"
                {...register("resource")}
            />

            <Input
                label="Action"
                {...register("action")}
            />

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

                Active

            </label>

            <div className="flex justify-end">

                <Button
                    type="submit"
                    loading={loading}
                >

                    {

                        permission
                            ? "Modifier"
                            : "Créer"

                    }

                </Button>

            </div>

        </form>

    );

}