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
                permission: "accounts.user.view",
            },

            {
                title: "Rôles",
                icon: Shield,
                href: "/roles",
                permission: "accounts.role.view",
            },

            {
                title: "Permissions",
                icon: KeyRound,
                href: "/permissions",
                permission: "accounts.permission.view",
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
                permission: "clients.client.view",
            },

            {
                title: "Produits",
                icon: Package,
                href: "/products",
                permission: "inventory.product.view",
            },

            {
                title: "Catégories",
                icon: FolderTree,
                href: "/categories",
                permission: "inventory.category.view",
            },

            {
                title: "Comptes",
                icon: Landmark,
                href: "/accounts",
                permission: "finance.account.view",
            },

            {
                title: "Transactions",
                icon: ArrowLeftRight,
                href: "/transactions",
                permission: "finance.transaction.view",
            },

            {
                title: "Employés",
                icon: Briefcase,
                href: "/employees",
                permission: "hr.employee.view",
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
                permission: "reports.report.view",
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
                permission: "settings.setting.view",
            },

        ],
    },

];

export default menu;