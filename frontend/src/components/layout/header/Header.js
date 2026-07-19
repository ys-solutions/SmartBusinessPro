"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Bell,
    User,
    Settings,
    KeyRound,
    LogOut,
} from "lucide-react";

import Modal from "@/components/ui/Modal";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

import { profileService } from "@/services/profile";
import { authService } from "@/services/auth";
import { passwordService } from "@/services/password";

import toast from "react-hot-toast";

export default function Header() {

    const router = useRouter();

    const menuRef = useRef(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await profileService.get();

            console.log("PROFILE =", response);

            if (response.success) {

                setUser(response.data);

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const logout = () => {

        authService.logout();

        router.replace("/login");

    };

    const handlePassword = async (data) => {

        try {

            await passwordService.change(data);

            toast.success(
                "Mot de passe modifié avec succès."
            );

            setOpenPasswordModal(false);

        } catch (error) {

            throw error;

        }

    };

    if (loading) {

        return (
            <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm" />
        );

    }

    const photo = user?.photo
        ? `${process.env.NEXT_PUBLIC_API_URL}${user.photo}`
        : "/images/avatar.jpg";

    return (

        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm">

            <div className="h-full flex items-center justify-between px-8">

                <div className="w-96">

                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />

                </div>

                <div className="flex items-center gap-6">

                    <button className="relative rounded-lg p-2 hover:bg-gray-100">

                        <Bell size={22} />

                    </button>

                    <div
                        ref={menuRef}
                        className="relative"
                    >

                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-100"
                        >

                            <img
                                src={photo}
                                alt="Utilisateur"
                                className="w-10 h-10 rounded-full border object-cover"
                            />

                            <div className="text-left">

                                <p className="text-sm font-semibold">

                                    {user
                                        ? `${user.first_name} ${user.last_name}`
                                        : "Utilisateur"}

                                </p>

                                <p className="text-xs text-gray-500">

                                    {typeof user?.role === "object"
                                        ? user.role.name
                                        : user?.role}

                                </p>

                            </div>

                        </button>

                        {open && (

                            <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white shadow-xl overflow-hidden">

                                <Link
                                    href="/profile"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                >

                                    <User size={18} />

                                    Mon profil

                                </Link>

                                <button
                                    onClick={() => {

                                        setOpen(false);

                                        setOpenPasswordModal(true);

                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                >

                                    <KeyRound size={18} />

                                    Changer le mot de passe

                                </button>

                                <Link
                                    href="/settings"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                                >

                                    <Settings size={18} />

                                    Paramètres

                                </Link>

                                <hr />

                                <button
                                    onClick={logout}
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

            <Modal
                open={openPasswordModal}
                onClose={() => setOpenPasswordModal(false)}
                title="Modifier le mot de passe"
                width="max-w-xl"
            >

                <ChangePasswordForm
                    onSubmit={handlePassword}
                />

            </Modal>

        </header>

    );

}