"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {

    const router = useRouter();

    const [checking, setChecking] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            router.replace("/login");

        } else {

            setChecking(false);

        }

    }, [router]);

    if (checking) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Vérification de la session...</p>
            </div>
        );

    }

    return children;

}