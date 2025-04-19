"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ClientProvider from "./ClientProvider";
import { Building, CalendarCheck, Coffee, House, LayoutDashboard } from "lucide-react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
    <ClientProvider>
      {!isAuthPage && !isAdminPage && <Navbar navbarItems={navbarItems} />}
      <main>{children}</main>
    </ClientProvider>
  );
}
