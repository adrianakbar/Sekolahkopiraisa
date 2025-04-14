"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";
import ClientProvider from "./components/ClientProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Tentukan apakah kita di halaman login atau daftar
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Tentukan apakah kita berada di halaman admin
  const isAdminPage = pathname.startsWith("/admin");

  const navbarItems = [
    { title: "Beranda", link: "/" },
    { title: "Tentang", link: "/about" },
    { title: "Produk", link: "/product" },
    { title: "Kegiatan", link: "/activity" },
  ];

  return (
    <html lang="id">
      <body>
        <ClientProvider>
          {/* Navbar hanya ditampilkan jika bukan halaman login/daftar atau admin */}
          {!isAuthPage && !isAdminPage && <Navbar navbarItems={navbarItems} />}
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
