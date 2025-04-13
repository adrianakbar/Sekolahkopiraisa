"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";
import ClientProvider from "./components/ClientProvider";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Tentukan apakah kita di halaman login atau daftar
  const isAuthPage = pathname === "/login" || pathname === "/signup";

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
          {!isAuthPage && <Navbar navbarItems={navbarItems} />} {/* Navbar hanya ditampilkan jika bukan login atau daftar */}
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
