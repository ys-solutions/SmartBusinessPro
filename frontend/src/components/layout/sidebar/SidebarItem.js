"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({
    href,
    title,
    icon: Icon,
    collapsed = false,
}) {

    const pathname = usePathname();

    const active =
        pathname === href ||
        (href !== "/" && pathname.startsWith(href));

    return (
        <Link
            href={href}
            className={`
                flex items-center
                ${collapsed ? "justify-center" : "gap-3"}
                rounded-xl
                px-3
                py-3
                transition-all
                duration-200
                ${
                    active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
            `}
        >
            <Icon size={20} className="shrink-0" />

            {!collapsed && (
                <span className="text-sm font-medium">
                    {title}
                </span>
            )}
        </Link>
    );
}