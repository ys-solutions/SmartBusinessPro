"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import PermissionTable from "@/components/permissions/PermissionTable";
import PermissionForm from "@/components/permissions/PermissionForm";

import Modal from "@/components/ui/Modal";

import { permissionService } from "@/services/permission";

import { usePermission } from "@/hooks/usePermission";

import toast from "react-hot-toast";

export default function PermissionPage() {

    const [permissions, setPermissions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [open, setOpen] = useState(false);

    const [selectedPermission, setSelectedPermission] = useState(null);

    const { can } = usePermission();

    const loadPermissions = async () => {

        try {

            const res = await permissionService.getAll();

            if (res.success) {

                setPermissions(res.data);

            }

        } catch (error) {

            toast.error(
                error?.message ||
                "Impossible de charger les permissions."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadPermissions();

    }, []);

    const handleCreate = () => {

        setSelectedPermission(null);

        setOpen(true);

    };

    const handleEdit = (permission) => {

        setSelectedPermission(permission);

        setOpen(true);

    };

    const handleSubmit = async (data) => {

        setSaving(true);

        try {

            if (selectedPermission) {

                await permissionService.update(

                    selectedPermission.id,

                    data,

                );

                toast.success(
                    "Permission modifiée avec succès."
                );

            } else {

                await permissionService.create(data);

                toast.success(
                    "Permission créée avec succès."
                );

            }

            setOpen(false);

            loadPermissions();

        } catch (error) {

            toast.error(

                error?.message ||

                "Erreur lors de l'enregistrement."

            );

        } finally {

            setSaving(false);

        }

    };

    const handleDelete = async (permission) => {

        const confirmDelete = window.confirm(

            `Supprimer la permission "${permission.name}" ?`

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await permissionService.delete(permission.id);

            toast.success(
                "Permission supprimée."
            );

            loadPermissions();

        } catch (error) {

            toast.error(

                error?.message ||

                "Impossible de supprimer cette permission."

            );

        }

    };

    return (

        <MainLayout>

            <PermissionTable

                permissions={permissions}

                loading={loading}

                onCreate={
                    can("accounts.permission.create")
                        ? handleCreate
                        : undefined
                }

                onEdit={
                    can("accounts.permission.update")
                        ? handleEdit
                        : undefined
                }

                onDelete={
                    can("accounts.permission.delete")
                        ? handleDelete
                        : undefined
                }

            />

            <Modal

                open={open}

                onClose={() => setOpen(false)}

                title={

                    selectedPermission

                        ? "Modifier une permission"

                        : "Nouvelle permission"

                }

                width="max-w-xl"

            >

                <PermissionForm

                    permission={selectedPermission}

                    loading={saving}

                    onSubmit={handleSubmit}

                />

            </Modal>

        </MainLayout>

    );

}