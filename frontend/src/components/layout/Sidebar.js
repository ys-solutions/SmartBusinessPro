"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
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
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Utilisateurs",
    href: "/users",
    icon: Users,
  },
  {
    title: "Rôles",
    href: "/roles",
    icon: Shield,
  },
  {
    title: "Permissions",
    href: "/permissions",
    icon: KeyRound,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: UserCheck,
  },
  {
    title: "Produits",
    href: "/products",
    icon: Package,
  },
  {
    title: "Catégories",
    href: "/categories",
    icon: FolderTree,
  },
  {
    title: "Comptes",
    href: "/accounts",
    icon: Landmark,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Employés",
    href: "/employees",
    icon: Briefcase,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0">

      <div className="h-20 flex items-center justify-center border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          SmartBusiness
        </h1>

      </div>

      <nav className="p-4 space-y-2">

        {menus.map((menu) => {

          const Icon = menu.icon;

          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              

              <span>{menu.title}</span>
            </Link>
          );
        })}

        

      </nav>

    </aside>
  );
}