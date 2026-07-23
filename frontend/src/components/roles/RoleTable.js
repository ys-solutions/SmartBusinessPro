"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import TableActions from "@/components/common/DataTable/TableActions";

import { ShieldCheck } from "lucide-react";

export default function RoleTable({

    roles,

    loading,

    onEdit,

    onDelete,

    onPermissions,

}) {

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

        <DataTable

            title="Gestion des rôles"

            subtitle="Liste des rôles disponibles."

            columns={columns}

            data={roles}

            loading={loading}

            renderActions={(role)=>(

                <div className="flex justify-center gap-2">

                    <button
                        onClick={()=>onPermissions(role)}
                        className="
                            rounded-lg
                            bg-blue-100
                            p-2
                            text-blue-600
                            hover:bg-blue-200
                        "
                    >

                        <ShieldCheck size={18}/>

                    </button>

                    <TableActions

                        onEdit={()=>onEdit(role)}

                        onDelete={()=>onDelete(role)}

                    />

                </div>

            )}

        />

    );

}