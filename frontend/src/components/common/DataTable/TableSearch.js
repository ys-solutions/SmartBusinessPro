"use client";

import { Search } from "lucide-react";

export default function TableSearch({

    value,
    onChange,
    placeholder = "Rechercher..."

}) {

    return (

        <div className="relative w-full md:w-96">

            <Search
                size={18}
                className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                "
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    py-2
                    pl-10
                    pr-4
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                "
            />

        </div>

    );

}