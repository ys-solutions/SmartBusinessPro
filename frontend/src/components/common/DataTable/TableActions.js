"use client";

import { Pencil, Trash2, Eye } from "lucide-react";

export default function TableActions({

    onView,
    onEdit,
    onDelete,

}) {

    return (

        <div className="flex items-center justify-center gap-2">

            {

                onView && (

                    <button
                        onClick={onView}
                        className="
                            rounded-lg
                            bg-blue-100
                            p-2
                            text-blue-600
                            transition
                            hover:bg-blue-200
                        "
                        title="Voir"
                    >

                        <Eye size={18} />

                    </button>

                )

            }

            {

                onEdit && (

                    <button
                        onClick={onEdit}
                        className="
                            rounded-lg
                            bg-amber-100
                            p-2
                            text-amber-600
                            transition
                            hover:bg-amber-200
                        "
                        title="Modifier"
                    >

                        <Pencil size={18} />

                    </button>

                )

            }

            {

                onDelete && (

                    <button
                        onClick={onDelete}
                        className="
                            rounded-lg
                            bg-red-100
                            p-2
                            text-red-600
                            transition
                            hover:bg-red-200
                        "
                        title="Supprimer"
                    >

                        <Trash2 size={18} />

                    </button>

                )

            }

        </div>

    );

}