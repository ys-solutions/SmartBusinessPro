"use client";

import { Plus } from "lucide-react";

export default function TableHeader({

    title,
    subtitle,
    onCreate,

}) {

    return (

        <div className="flex items-center justify-between border-b px-6 py-5">

            <div>

                <h2 className="text-2xl font-bold text-gray-800">

                    {title}

                </h2>

                {

                    subtitle && (

                        <p className="mt-1 text-sm text-gray-500">

                            {subtitle}

                        </p>

                    )

                }

            </div>

            {

                onCreate && (

                    <button
                        onClick={onCreate}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >

                        <Plus size={18} />

                        Ajouter

                    </button>

                )

            }

        </div>

    );

}