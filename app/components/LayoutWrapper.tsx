"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ClientProvider from "./ClientProvider";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isAdminPage = pathname.startsWith("/admin");

  const navbarItems = [
    { title: "Beranda", link: "/" },
    { title: "Tentang", link: "/about" },
    { title: "Produk", link: "/product" },
    { title: "Kegiatan", link: "/activity" },
  ];

  return (
    <ClientProvider>
      {!isAuthPage && !isAdminPage && <Navbar navbarItems={navbarItems} />}
      <main>{children}</main>
    </ClientProvider>
  );
}
