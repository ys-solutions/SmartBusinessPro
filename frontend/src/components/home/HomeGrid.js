"use client";

import {
    Users,
    Shield,
    KeyRound,
    UserCircle,
    LayoutDashboard,
} from "lucide-react";

import HomeCard from "./HomeCard";

export default function HomeGrid() {

    const modules = [
        {
            title: "Tableau de bord",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "bg-blue-600",
        },
        {
            title: "Mon profil",
            icon: UserCircle,
            href: "/profile",
            color: "bg-indigo-600",
        },
        {
            title: "Utilisateurs",
            icon: Users,
            href: "/users",
            color: "bg-green-600",
        },
        {
            title: "Rôles",
            icon: Shield,
            href: "/roles",
            color: "bg-orange-500",
        },
        {
            title: "Permissions",
            icon: KeyRound,
            href: "/permissions",
            color: "bg-purple-600",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {modules.map((module) => (
                <HomeCard
                    key={module.title}
                    {...module}
                />
            ))}
        </div>
    );
}