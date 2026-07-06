"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      <Sidebar />

      <div className="ml-64 flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}