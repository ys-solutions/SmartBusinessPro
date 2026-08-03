"use client";

import { useMemo } from "react";

export function usePermission() {

    const permissions = useMemo(() => {

        if (typeof window === "undefined") {

            return [];

        }

        return JSON.parse(

            localStorage.getItem("permissions") || "[]"

        );

    }, []);

    const can = (permission) => {

        return permissions.includes(permission);

    };

    return {

        permissions,
        can,

    };

}