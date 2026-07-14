"use client";

import { useState } from "react";

import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

export default function MainLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <div className="min-h-screen bg-gray-100">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div
                className={`
                    transition-all
                    duration-300
                    ${
                        collapsed
                            ? "ml-20"
                            : "ml-72"
                    }
                `}
            >

                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}