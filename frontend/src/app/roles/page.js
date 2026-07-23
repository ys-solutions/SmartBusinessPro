"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import RoleTable from "@/components/roles/RoleTable";

import { roleService } from "@/services/role";

export default function RolesPage() {

    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadRoles = async () => {

        try {

            const res = await roleService.getAll();

            if (res.success) {

                setRoles(res.data);

            }

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadRoles();

    }, []);

    return (

        <MainLayout>

            <RoleTable

                roles={roles}

                loading={loading}

                onEdit={(role)=>console.log(role)}

                onDelete={(role)=>console.log(role)}

                onPermissions={(role)=>console.log(role)}

            />

        </MainLayout>

    );

}