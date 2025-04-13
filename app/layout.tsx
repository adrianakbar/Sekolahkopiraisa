// app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { getUser } from "./utils/user";
import { useUserStore } from "./stores/userStore";

export const metadata = {
  title: "Website Title",
  description: "Deskripsi website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(); // Panggil API yang validasi cookie
        if (user) setUser(user);
      } catch (err) {
        console.error("User not logged in.");
      }
    };
    fetchUser();
  }, [setUser]);

  const navbarItems = [
    { title: "Beranda", link: "/" },
    { title: "Tentang", link: "/about" },
    { title: "Produk", link: "/product" },
    { title: "Kegiatan", link: "/activity" },
  ];

  return (
    <html lang="id">
      <body>
        <Navbar navbarItems={navbarItems} />
        <main>{children}</main>
      </body>
    </html>
  );
}
