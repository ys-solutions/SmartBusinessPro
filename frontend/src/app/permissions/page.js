"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import PermissionTable from "@/components/permissions/PermissionTable";

import { permissionService } from "@/services/permission";

export default function PermissionPage() {

    const [permissions, setPermissions] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadPermissions = async () => {

        try {

            const res = await permissionService.getAll();

            if (res.success) {

                setPermissions(res.data);

            }

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadPermissions();

    }, []);

    return (

        <MainLayout>

            <PermissionTable

                permissions={permissions}

                loading={loading}

                onEdit={(permission) => console.log(permission)}

                onDelete={(permission) => console.log(permission)}

            />

        </MainLayout>

    );

}