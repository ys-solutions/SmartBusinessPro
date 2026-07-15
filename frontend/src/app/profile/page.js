"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import ProfileForm from "@/components/profile/ProfileForm";

import { profileService } from "@/services/profile";

import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

import { passwordService } from "@/services/password";

export default function ProfilePage() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const response = await profileService.get();

            if (response.success) {
                setProfile(response.data);
            }
        } catch (error) {
            console.error("Erreur chargement profil :", error);
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
            await loadProfile();
        } catch (error) {
            console.error("Erreur mise à jour profil :", error);
            throw error;
        }
    };

    const handlePassword = async (data) => {

        await passwordService.change(data);

        alert("Mot de passe modifié avec succès.");

    };

    if (loading) {

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

            <div className="mt-8">

                <ChangePasswordForm
                onSubmit={handlePassword}
            />

</div>

        </MainLayout>

    );

}