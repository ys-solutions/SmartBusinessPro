"use client";

import MainLayout from "@/components/layout/MainLayout";
import HomeGrid from "@/components/home/HomeGrid";

export default function HomePage() {

    return (
        <MainLayout>

            <div className="mb-10">

                <h1 className="text-4xl font-bold">
                    Bienvenue 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Sélectionnez un module pour commencer.
                </p>

            </div>

            <HomeGrid />

        </MainLayout>
    );
}