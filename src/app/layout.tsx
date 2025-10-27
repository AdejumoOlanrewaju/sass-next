import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NavAuth from "./components/NavAuth";
import PathnameWrapper from "./components/PathWrapper";
import { Toaster } from "sonner";
import FetchStoreData from "./components/FetchStoreData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],  // you can choose: "latin", "latin-ext", "cyrillic", etc.
  weight: ["400", "700"], // optional: font weights
  display: "swap",
  preload: false,
})

export const metadata = {
  title: "TelexBlog | Tech, Laptops & Tips",
  description: "TelexBlog helps students and devs with laptop picks, bug fixes, and practical tutorials.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "TelexBlog",
    description: "Latest laptops, coding tips, and bug fixes.",
    url: "https://telexblog.vercel.app",
    images: [
      {
        url: "https://telexblog.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TelexBlog - Tech for students and developers",
      },
    ],
    siteName: "TelexBlog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TelexBlog",
    images: ["https://telexblog.vercel.app/og-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <FetchStoreData />
        <PathnameWrapper>
          {children}
          <Toaster position="top-center" richColors />
        </PathnameWrapper>
        {/* <Footer/> */}
      </body>
    </html>
  );
}
