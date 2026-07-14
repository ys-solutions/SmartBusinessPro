"use client";

import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import menu from "./menu";
import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar({
    collapsed,
    setCollapsed,
}) {
    return (
        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                flex
                h-screen
                flex-col
                bg-slate-900
                border-r
                border-slate-800
                text-white
                transition-all
                duration-300
                ${
                    collapsed
                        ? "w-20"
                        : "w-72"
                }
            `}
        >
            {/* HEADER */}

            <div className="relative border-b border-slate-800">

                {/* Bouton Réduire */}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-800 transition"
                >
                    {collapsed ? (
                        <ChevronRight size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>

                {/* Logo */}

                <div className="flex flex-col items-center py-6">

                    <div
                        className={`
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            shadow-lg
                            transition-all
                            duration-300
                            ${
                                collapsed
                                    ? "w-14 h-14"
                                    : "w-24 h-24"
                            }
                        `}
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={collapsed ? 38 : 70}
                            height={collapsed ? 38 : 70}
                            priority
                        />
                    </div>

                    <div
                        className={`
                            overflow-hidden
                            transition-all
                            duration-300
                            ${
                                collapsed
                                    ? "max-h-0 opacity-0"
                                    : "max-h-24 opacity-100 mt-4"
                            }
                        `}
                    >
                        <h2 className="text-lg font-bold text-center">
                            SmartBusiness
                        </h2>

                        <p className="text-xs text-slate-400 text-center">
                            Business Management
                        </p>
                    </div>

                </div>

            </div>

            {/* MENU */}

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">

                {menu.map((item) =>

                    item.children ? (

                        <SidebarGroup
                            key={item.title}
                            title={item.title}
                            children={item.children}
                            collapsed={collapsed}
                        />

                    ) : (

                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            title={item.title}
                            icon={item.icon}
                            collapsed={collapsed}
                        />

                    )

                )}

            </div>

            {/* FOOTER */}

            <SidebarFooter collapsed={collapsed} />

        </aside>
    );
}