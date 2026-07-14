"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import {
    Bell,
    User,
    Settings,
    KeyRound,
    LogOut,
} from "lucide-react";

export default function Header() {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    return (

        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm">

            <div className="h-full flex items-center justify-between px-8">

                {/* Recherche */}

                <div className="w-96">

                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />

                </div>

                {/* Partie droite */}

                <div className="flex items-center gap-6">

                    {/* Notifications */}

                    <button className="relative rounded-lg p-2 hover:bg-gray-100 transition">

                        <Bell size={22} />

                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">

                            3

                        </span>

                    </button>

                    {/* Utilisateur */}

                    <div
                        ref={menuRef}
                        className="relative"
                    >

                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-100 transition"
                        >

                            <Image
                                src="/images/avatar.jpg"
                                alt="Utilisateur"
                                width={40}
                                height={40}
                                className="rounded-full border"
                            />

                            <div className="text-left">

                                <p className="text-sm font-semibold">

                                    Administrateur

                                </p>

                                <p className="text-xs text-gray-500">

                                    admin

                                </p>

                            </div>

                        </button>

                        {open && (

                            <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white shadow-xl overflow-hidden">

                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                >

                                    <User size={18} />

                                    Mon profil

                                </Link>

                                <Link
                                    href="/profile/password"
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                >

                                    <KeyRound size={18} />

                                    Changer le mot de passe

                                </Link>

                                <Link
                                    href="/settings"
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                >

                                    <Settings size={18} />

                                    Paramètres

                                </Link>

                                <hr />

                                <button
                                    className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                                >

                                    <LogOut size={18} />

                                    Déconnexion

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>

    );

}