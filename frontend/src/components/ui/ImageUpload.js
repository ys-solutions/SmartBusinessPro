"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, Trash2 } from "lucide-react";

const DEFAULT_IMAGE = "/images/avatar.png";

export default function ImageUpload({
    value,
    onChange,
    error,
}) {

    const inputRef = useRef(null);

    const [preview, setPreview] = useState(DEFAULT_IMAGE);

    useEffect(() => {

        if (!value) {

            setPreview(DEFAULT_IMAGE);

            return;

        }

        if (typeof value === "string") {

            setPreview(value);

            return;

        }

        const url = URL.createObjectURL(value);

        setPreview(url);

        return () => URL.revokeObjectURL(url);

    }, [value]);

    const handleFile = (file) => {

        if (!file) return;

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowed.includes(file.type)) {

            alert("Formats autorisés : JPG, PNG, WEBP.");

            return;

        }

        if (file.size > 2 * 1024 * 1024) {

            alert("Image trop volumineuse (2 Mo maximum).");

            return;

        }

        onChange(file);

    };

    return (

        <div className="flex flex-col items-center">

            <div className="relative">

                <img
                    src={preview}
                    alt="Photo"
                    className="w-36 h-36 rounded-full object-cover border-2 border-gray-200"
                />

                <button
                    type="button"
                    onClick={() => inputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                >
                    <Camera size={18} />
                </button>

            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files[0])}
            />

            {
                value && (

                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="mt-3 flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                        <Trash2 size={16} />

                        Supprimer

                    </button>

                )
            }

            {
                error && (

                    <p className="text-red-500 text-sm mt-2">

                        {error}

                    </p>

                )
            }

        </div>

    );

}