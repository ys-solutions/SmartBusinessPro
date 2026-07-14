"use client";

export default function SidebarFooter({ collapsed = false }) {
    if (collapsed) {
        return (
            <div className="border-t border-slate-800 p-3 flex justify-center">
                <span className="text-xs text-slate-500 font-semibold">
                    v1.0
                </span>
            </div>
        );
    }

    return (
        <div className="border-t border-slate-800 p-4">

            <div className="text-center">

                <p className="text-xs text-slate-400">
                    SmartBusiness Pro
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    Version 1.0.0
                </p>

                <p className="mt-2 text-xs text-slate-600">
                    © {new Date().getFullYear()} YS Solutions
                </p>

            </div>

        </div>
    );
}