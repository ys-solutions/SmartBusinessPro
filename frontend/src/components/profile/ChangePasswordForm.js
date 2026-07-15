"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { Lock } from "lucide-react";



export default function ChangePasswordForm({

    onSubmit,

}) {

    const [serverErrors, setServerErrors] = useState({});

    const {

        register,

        handleSubmit,

        reset,

    } = useForm();

    return (

        <div className="bg-white rounded-xl shadow p-8">

            <h3 className="text-lg font-semibold mb-6">

                Changer le mot de passe

            </h3>

            <form

                onSubmit={handleSubmit(async (data) => {

                    try {

                        setServerErrors({});

                        await onSubmit(data);

                        reset();

                    } catch (error) {

                        setServerErrors(
                            error.errors || error
                        );

                    }

                })}

                className="space-y-5"

            >

                <Input
                    type="password"
                    label="Mot de passe actuel"
                    icon={Lock}
                    error={serverErrors.current_password?.[0]}
                    {...register("current_password")}
                />

                <Input
                    type="password"
                    label="Nouveau mot de passe"
                    icon={Lock}
                    error={serverErrors.new_password?.[0]}
                    {...register("new_password")}
                />

                <Input
                    type="password"
                    label="Confirmation"
                    icon={Lock}
                    error={serverErrors.confirm_password?.[0]}
                    {...register("confirm_password")}
                />

                <div className="flex justify-end">

                    <Button type="submit">

                        Modifier le mot de passe

                    </Button>

                </div>

            </form>

        </div>

    );

}