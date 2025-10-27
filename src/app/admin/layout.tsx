import React from 'react'
import SidebarAdmin from '../components/SidebarAdmin';
import FetchStoreData from '../components/FetchStoreData';
import { Geist, Geist_Mono } from "next/font/google";
import AdminPathWrapper from '../components/AdminPathWrapper';
// src/app/admin/layout.tsx

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
    preload: false,
});
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className={`bg-gray-200 text-white min-h-screen flex w-full ${geistSans.className} antialiased`}>
            <FetchStoreData />
            {/* You can add a sidebar or admin navbar here if needed */}
            <AdminPathWrapper>
                {children}

            </AdminPathWrapper>
        </div>
    );
}
