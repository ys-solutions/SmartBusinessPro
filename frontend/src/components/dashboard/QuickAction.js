"use client";

import {
    UserPlus,
    PackagePlus,
    Landmark,
    ArrowLeftRight
} from "lucide-react";

export default function QuickAction(){

    const actions = [

        {
            title:"Nouveau client",
            icon:UserPlus,
        },

        {
            title:"Nouveau produit",
            icon:PackagePlus,
        },

        {
            title:"Nouveau compte",
            icon:Landmark,
        },

        {
            title:"Nouvelle transaction",
            icon:ArrowLeftRight,
        },

    ];

    return(

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            <h2 className="text-xl font-semibold mb-5">

                Accès rapides

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {actions.map((action,index)=>{

                    const Icon = action.icon;

                    return(

                        <button
                            key={index}
                            className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
                        >

                            <Icon
                                className="mx-auto text-blue-600"
                                size={32}
                            />

                            <div className="mt-3">

                                {action.title}

                            </div>

                        </button>

                    )

                })}

            </div>

        </div>

    )

}