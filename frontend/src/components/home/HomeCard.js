"use client";

import Link from "next/link";

export default function HomeCard({
    title,
    icon: Icon,
    href,
    color = "bg-blue-600",
}) {
    return (
        <Link href={href}>
            <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all cursor-pointer p-8 flex flex-col items-center justify-center h-48 hover:-translate-y-1">

                <div
                    className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5`}
                >
                    <Icon size={34} />
                </div>

                <h2 className="text-lg font-semibold text-gray-800">
                    {title}
                </h2>

            </div>
        </Link>
    );
}