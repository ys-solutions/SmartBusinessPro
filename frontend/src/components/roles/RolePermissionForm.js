"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";

import { permissionService } from "@/services/permission";

export default function RolePermissionForm({

    role,

    onSubmit,

    loading,

}) {

    const [permissions, setPermissions] = useState([]);

    const [selected, setSelected] = useState([]);

    useEffect(() => {

        if (!role) return;

        async function load() {

            try {

                const all = await permissionService.getAll();

                const rolePermissions = await fetchRolePermissions();

                if (all.success) {

                    setPermissions(all.data);

                }

                if (rolePermissions.success) {

                    setSelected(

                        rolePermissions.data.permissions.map(

                            (permission) => permission.id

                        )

                    );

                }

            } catch (error) {

                console.error(error);

            }

        }

        load();

    }, [role]);

    async function fetchRolePermissions() {

        return await import("@/services/role").then(

            ({ roleService }) =>

                roleService.getPermissions(role.id)

        );

    }

    function toggle(id) {

        if (selected.includes(id)) {

            setSelected(

                selected.filter((item) => item !== id)

            );

        } else {

            setSelected([...selected, id]);

        }

    }

    return (

        <form

            onSubmit={(e) => {

                e.preventDefault();

                onSubmit(selected);

            }}

        >

            <div className="max-h-[450px] overflow-y-auto space-y-3">

                {

                    permissions.map((permission) => (

                        <label

                            key={permission.id}

                            className="flex items-center gap-3 border rounded-lg p-3 hover:bg-gray-50"

                        >

                            <input

                                type="checkbox"

                                checked={selected.includes(permission.id)}

                                onChange={() => toggle(permission.id)}

                            />

                            <div>

                                <div className="font-medium">

                                    {permission.name}

                                </div>

                                <div className="text-sm text-gray-500">

                                    {permission.description}

                                </div>

                            </div>

                        </label>

                    ))

                }

            </div>

            <div className="flex justify-end mt-6">

                <Button

                    type="submit"

                    loading={loading}

                >

                    Enregistrer

                </Button>

            </div>

        </form>

    );

}