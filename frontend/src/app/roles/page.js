"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import DataTable from "@/components/common/DataTable/DataTable";
import TableActions from "@/components/common/DataTable/TableActions";
import Modal from "@/components/ui/Modal";

import RoleForm from "@/components/roles/RoleForm";
import RolePermissionForm from "@/components/roles/RolePermissionForm";
import { usePermission } from "@/hooks/usePermission";

import { roleService } from "@/services/role";

import toast from "react-hot-toast";


export default function RolesPage() {

    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [open, setOpen] = useState(false);

    const [selectedRole, setSelectedRole] = useState(null);

    const [permissionOpen, setPermissionOpen] = useState(false);

    const [permissionLoading, setPermissionLoading] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const { can } = usePermission();

    const loadRoles = async () => {

        try {

            const res = await roleService.getAll();

            if (res.success) {

                setRoles(res.data);

            }

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadRoles();

    }, []);

    const handleCreate = () => {

        setSelectedRole(null);

        setOpen(true);

    };

    const handleEdit = (role) => {

        setSelectedRole(role);

        setOpen(true);

    };

    const handlePermissions = (role) => {

        setSelectedRole(role);

        setPermissionOpen(true);

    };

    const handleSubmit = async (data) => {

        setSaving(true);

        try {

            if (selectedRole) {

                await roleService.update(
                    selectedRole.id,
                    data
                );

                toast.success("Rôle modifié.");

            } else {

                await roleService.create(data);

                toast.success("Rôle créé.");

            }

            setOpen(false);

            loadRoles();

        } finally {

            setSaving(false);

        }

    };

    const handleDelete = async (role) => {

        const confirmDelete = window.confirm(

            `Supprimer le rôle "${role.name}" ?`

        );

        if (!confirmDelete) return;

        setDeleting(true);

        try {

            await roleService.delete(role.id);

            toast.success("Rôle supprimé avec succès.");

            loadRoles();

        } catch (error) {

            toast.error(

                error?.message ||

                "Impossible de supprimer ce rôle."

            );

        } finally {

            setDeleting(false);

        }

    };

    const handleSavePermissions = async (permissions) => {

        setPermissionLoading(true);

        try {

            await roleService.updatePermissions(

                selectedRole.id,

                {

                    permissions,

                }

            );

            toast.success(

                "Permissions mises à jour."

            );

            setPermissionOpen(false);

        } catch (error) {

            toast.error(

                "Erreur lors de la mise à jour."

            );

        } finally {

            setPermissionLoading(false);

        }

    };

    const columns = [

        {
            key: "name",
            label: "Nom",
        },

        {
            key: "description",
            label: "Description",
        },

    ];

    return (

        <MainLayout>

            <DataTable

                title="Gestion des rôles"

                subtitle="Liste des rôles du système."

                columns={columns}

                data={roles}

                loading={loading}

                onCreate={
                    can("accounts.role.create")
                        ? handleCreate
                        : null
                }

                renderActions={(role)=>(

                    <TableActions

                        canEdit={can("accounts.role.update")}

                        canDelete={can("accounts.role.delete")}

                        canPermission={
                            can("accounts.permission.view")
                        }

                        onPermissions={
                            can("accounts.permission.view")
                                ? () => handlePermissions(role)
                                : null
                        }

                        onEdit={
                            can("accounts.role.update")
                                ? () => handleEdit(role)
                                : null
                        }

                        onDelete={
                            can("accounts.role.delete")
                                ? () => handleDelete(role)
                                : null
                        }

                    />

                )}

            />

            <Modal

                open={open}

                onClose={()=>setOpen(false)}

                title={
                    selectedRole
                        ? "Modifier un rôle"
                        : "Nouveau rôle"
                }

                width="max-w-xl"

            >

                <RoleForm

                    role={selectedRole}

                    loading={saving}

                    onSubmit={handleSubmit}

                />

            </Modal>

            <Modal

                open={permissionOpen}

                onClose={() => setPermissionOpen(false)}

                title={`Permissions : ${selectedRole?.name || ""}`}

                width="max-w-3xl"

            >

                {

                    selectedRole && (

                        <RolePermissionForm

                            role={selectedRole}

                            loading={permissionLoading}

                            onSubmit={handleSavePermissions}

                        />

                    )

                }

            </Modal>

        </MainLayout>

    );

}