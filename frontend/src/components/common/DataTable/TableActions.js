"use client";

import { Pencil, Trash2, Eye, ShieldCheck } from "lucide-react";

export default function TableActions({

    canView = true,
    canEdit = true,
    canDelete = true,
    canPermission = true,

    onView,
    onEdit,
    onDelete,
    onPermission,

}) {

    return (

        <div className="flex items-center justify-center gap-2">

            {

                canView && onView && (

                    <button
                        onClick={onView}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                        title="Voir"
                    >

                        <Eye size={18}/>

                    </button>

                )

            }

            {

                canPermission && onPermission && (

                    <button
                        onClick={onPermission}
                        className="rounded-lg bg-indigo-100 p-2 text-indigo-600 hover:bg-indigo-200"
                        title="Permissions"
                    >

                        <ShieldCheck size={18}/>

                    </button>

                )

            }

            {

                canEdit && onEdit && (

                    <button
                        onClick={onEdit}
                        className="rounded-lg bg-amber-100 p-2 text-amber-600 hover:bg-amber-200"
                        title="Modifier"
                    >

                        <Pencil size={18}/>

                    </button>

                )

            }

            {

                canDelete && onDelete && (

                    <button
                        onClick={onDelete}
                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        title="Supprimer"
                    >

                        <Trash2 size={18}/>

                    </button>

                )

            }

        </div>

    );

}