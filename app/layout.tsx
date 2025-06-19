"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { Building, CalendarCheck, Coffee, House } from "lucide-react";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/reset-password";
  const isAdminPage = pathname.startsWith("/admin");

  const navbarItems = [
    { title: "Beranda", link: "/", icon: <House size={20} /> },
    { title: "Tentang", link: "/about", icon: <Building size={20} /> },
    { title: "Produk", link: "/product", icon: <Coffee size={20} /> },
    { title: "Kegiatan", link: "/activity", icon: <CalendarCheck size={20} /> },
  ];

  return (
    <html lang="id">
      <Head>
        <title>Sekolah Kopi Raisa</title>
        <meta name="description" content="Sistem informasi untuk mengelola kegiatan dan produk" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <body>
        {!isAuthPage && !isAdminPage && <Navbar navbarItems={navbarItems} />}
        <main>{children}</main>
      </body>
    </html>
  );
}
