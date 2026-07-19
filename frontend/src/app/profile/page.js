"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";

import ProfileForm from "@/components/profile/ProfileForm";

import { profileService } from "@/services/profile";
import { passwordService } from "@/services/password";

import toast from "react-hot-toast";

export default function ProfilePage() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const response = await profileService.get();

            console.log("PROFILE RESPONSE :", response);

            if (response?.success && response?.data) {
                setProfile(response.data);
            } else {
                setProfile(null);
            }

        } catch (error) {
            console.error("Erreur chargement profil :", error);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        loadProfile();

    }, []);

    const handleSubmit = async (data) => {

        try {

            await profileService.update(data);

            toast.success(
                "Profil mis à jour avec succès."
            );

            await loadProfile();

        } catch (error) {

            console.error(error);

            toast.error(
                error.message ||
                "Erreur lors de la mise à jour."
            );

            throw error;

        }

    };


    if (loading || !profile) {

        return (

            <MainLayout>

                <div className="text-center py-20">

                    Chargement du profil...

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Mon profil

                </h1>

                <p className="text-gray-500 mt-2">

                    Gérez vos informations personnelles.

                </p>

            </div>

            <ProfileForm
                user={profile}
                onSubmit={handleSubmit}
            />

        </MainLayout>

    );

}