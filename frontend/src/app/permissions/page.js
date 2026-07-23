"use client";

import { useEffect } from "react";
import { permissionService } from "@/services/permission";

export default function PermissionPage() {

    useEffect(() => {

        async function load() {

            try {

                const res = await permissionService.getAll();

                console.log("PERMISSIONS =", res);

            } catch (error) {

                console.error("ERREUR =", error);

            }

        }

        load();

    }, []);

    return (
        <div className="p-8">
            Test Permissions
        </div>
    );

}