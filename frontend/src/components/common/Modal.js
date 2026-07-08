"use client";

import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

        <div className="flex items-center justify-between px-6 py-4 border-b">

          <h2 className="text-xl font-semibold">

            {title}

          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100"
          >

            <X size={20} />

          </button>

        </div>

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>

  );

}