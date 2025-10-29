"use client";
import React from 'react'
import Footer from './Footer';
import { usePathname } from "next/navigation";
import Navbar from './Navbar';

export default function PathnameWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");
  const isSignup = pathname.startsWith("/signup");
  
  return (
    <>
      {!isAdmin && !isLogin && !isSignup && <Navbar />}
      {children}
      {!isAdmin && !isLogin && !isSignup && <Footer />}

    </>
  );
}
