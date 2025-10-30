import React from 'react'
import SidebarAdmin from '../components/SidebarAdmin';
import FetchStoreData from '../components/FetchStoreData';
import { Inter } from "next/font/google";
import AdminPathWrapper from '../components/AdminPathWrapper';
import { SidebarProvider } from '@/lib/context/SidebarContext';
// src/app/admin/layout.tsx

const inter = Inter({
    subsets: ["latin"],  // you can choose: "latin", "latin-ext", "cyrillic", etc.
    weight: ["400", "700"], // optional: font weights
    display: "swap",
    preload: false,
})
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className={`bg-gray-200 text-white min-h-screen flex w-full ${inter.className} antialiased`}>
            <FetchStoreData />
            {/* You can add a sidebar or admin navbar here if needed */}
            <SidebarProvider>
                <AdminPathWrapper>
                    {children}

                </AdminPathWrapper>
            </SidebarProvider>
        </div>
    );
}
