"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import TableActions from "@/components/common/DataTable/TableActions";

export default function PermissionTable({

    permissions,

    loading,

    onCreate,

    onEdit,

    onDelete,

}) {

    const columns = [

        {
            key: "module",
            label: "Module",
        },

        {
            key: "resource",
            label: "Ressource",
        },

        {
            key: "action",
            label: "Action",
        },

        {
            key: "description",
            label: "Description",
        },

    ];

    return (

        <DataTable

            title="Gestion des permissions"

            subtitle="Liste des permissions du système."

            columns={columns}

            data={permissions}

            loading={loading}

            onCreate={onCreate}

            renderActions={(permission) => (

                <TableActions

                    canEdit={!!onEdit}
                    canDelete={!!onDelete}

                    onEdit={

                        onEdit
                            ? () => onEdit(permission)
                            : undefined

                    }

                    onDelete={

                        onDelete
                            ? () => onDelete(permission)
                            : undefined

                    }

                />

            )}

        />

    );

}