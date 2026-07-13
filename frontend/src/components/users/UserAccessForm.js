"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Modal from "@/components/common/Modal";

import Button from "@/components/ui/Button";

import { roleService } from "@/services/role";

export default function UserAccessForm({

    open,

    user,

    onClose,

    onSubmit,

}) {

    const [roles, setRoles] = useState([]);

    const {

        register,

        handleSubmit,

        reset,

    } = useForm();

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

    useEffect(() => {

        if (!user) return;

        reset({

            role: user.role?.id ?? user.role,

            is_active: user.is_active,

            is_locked: user.is_locked,

            must_change_password: user.must_change_password,

        });

    }, [user, reset]);

    return (

        <Modal

            open={open}

            onClose={onClose}

            title="Gestion des accès"

        >

            <form
                onSubmit={handleSubmit(onSubmit)}
            >

                <div className="space-y-4">

                    <div>

                        <label className="block mb-1 font-medium">

                            Rôle

                        </label>

                        <select

                            {...register("role")}

                            className="w-full border rounded-lg px-3 py-2"

                        >

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

                    </div>

                    <label className="flex items-center gap-3">

                        <input

                            type="checkbox"

                            {...register("is_active")}

                        />

                        Utilisateur actif

                    </label>

                    <label className="flex items-center gap-3">

                        <input

                            type="checkbox"

                            {...register("is_locked")}

                        />

                        Compte verrouillé

                    </label>

                    <label className="flex items-center gap-3">

                        <input

                            type="checkbox"

                            {...register("must_change_password")}

                        />

                        Forcer le changement du mot de passe

                    </label>

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

                        Enregistrer

                    </Button>

                </div>

            </form>

        </Modal>

    );

}