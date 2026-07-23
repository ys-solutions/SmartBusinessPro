"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function TablePagination({

    page,

    totalPages,

    onPrevious,

    onNext,

}) {

    if (totalPages <= 1) {

        return null;

    }

    return (

        <div className="flex items-center justify-between border-t px-6 py-4">

            <button
                onClick={onPrevious}
                disabled={page === 1}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    px-4
                    py-2
                    disabled:opacity-40
                    hover:bg-gray-100
                "
            >

                <ChevronLeft size={18}/>

                Précédent

            </button>

            <span className="text-sm text-gray-600">

                Page

                <strong> {page} </strong>

                sur

                <strong> {totalPages} </strong>

            </span>

            <button
                onClick={onNext}
                disabled={page === totalPages}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    px-4
                    py-2
                    disabled:opacity-40
                    hover:bg-gray-100
                "
            >

                Suivant

                <ChevronRight size={18}/>

            </button>

        </div>

    );

}