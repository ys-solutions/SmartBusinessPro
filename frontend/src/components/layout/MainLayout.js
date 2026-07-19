"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

export default function MainLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <ProtectedRoute>

            <div className="min-h-screen bg-gray-100">

                <Sidebar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <div
                    className={`transition-all duration-300 ${
                        collapsed ? "ml-20" : "ml-72"
                    }`}
                >

                    <Header />

                    <main className="p-8">

                        {children}

                    </main>

                </div>

            </div>

        </ProtectedRoute>

    );

}