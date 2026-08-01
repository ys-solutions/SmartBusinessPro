"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import DataTable from "@/components/common/DataTable/DataTable";
import TableActions from "@/components/common/DataTable/TableActions";
import Modal from "@/components/ui/Modal";

import RoleForm from "@/components/roles/RoleForm";

import { roleService } from "@/services/role";

import toast from "react-hot-toast";


export default function RolesPage() {

    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [open, setOpen] = useState(false);

    const [selectedRole, setSelectedRole] = useState(null);

    const [deleting, setDeleting] = useState(false);

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

                onCreate={handleCreate}

                renderActions={(role)=>(

                    <TableActions

                        onEdit={()=>handleEdit(role)}

                        onDelete={() => handleDelete(role)}

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

        </MainLayout>

    );

}