"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function SidebarGroup({
    title,
    children = [],
    collapsed = false,
}) {
    const pathname = usePathname();

    const hasActiveChild = children.some((item) =>
        pathname.startsWith(item.href)
    );

    const [open, setOpen] = useState(hasActiveChild);

    useEffect(() => {
        if (hasActiveChild) {
            setOpen(true);
        }
    }, [hasActiveChild]);

    if (collapsed) {
        return (
            <div className="space-y-1">
                {children.map((item) => (
                    <SidebarItem
                        key={item.href}
                        {...item}
                        collapsed
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="mb-2">

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
                <span>{title}</span>

                {open ? (
                    <ChevronDown size={18} />
                ) : (
                    <ChevronRight size={18} />
                )}
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    open ? "max-h-96 mt-1" : "max-h-0"
                }`}
            >
                <div className="ml-3 border-l border-slate-700 pl-2 space-y-1">
                    {children.map((item) => (
                        <SidebarItem
                            key={item.href}
                            {...item}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}