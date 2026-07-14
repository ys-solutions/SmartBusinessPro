import {
    Home,
    LayoutDashboard,
    Users,
    Shield,
    KeyRound,
    UserCheck,
    Package,
    FolderTree,
    Landmark,
    ArrowLeftRight,
    Briefcase,
    BarChart3,
    Settings,
} from "lucide-react";

const menu = [
    {
        title: "Accueil",
        icon: Home,
        href: "/home",
    },
    {
        title: "Tableau de bord",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        title: "Administration",
        children: [
            {
                title: "Utilisateurs",
                icon: Users,
                href: "/users",
            },
            {
                title: "Rôles",
                icon: Shield,
                href: "/roles",
            },
            {
                title: "Permissions",
                icon: KeyRound,
                href: "/permissions",
            },
        ],
    },
    {
        title: "Gestion",
        children: [
            {
                title: "Clients",
                icon: UserCheck,
                href: "/clients",
            },
            {
                title: "Produits",
                icon: Package,
                href: "/products",
            },
            {
                title: "Catégories",
                icon: FolderTree,
                href: "/categories",
            },
            {
                title: "Comptes",
                icon: Landmark,
                href: "/accounts",
            },
            {
                title: "Transactions",
                icon: ArrowLeftRight,
                href: "/transactions",
            },
            {
                title: "Employés",
                icon: Briefcase,
                href: "/employees",
            },
        ],
    },
    {
        title: "Rapports",
        children: [
            {
                title: "Rapports",
                icon: BarChart3,
                href: "/reports",
            },
        ],
    },
    {
        title: "Paramètres",
        children: [
            {
                title: "Paramètres",
                icon: Settings,
                href: "/settings",
            },
        ],
    },
];

export default menu;