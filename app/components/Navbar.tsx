"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUser } from "../utils/user";
import { X } from "lucide-react";
import { logout } from "../utils/auth";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "../stores/userStore";

interface NavbarItem {
  title: string;
  link: string;
}

interface User {
  name: string;
  image: string;
}

export default function Navbar({ navbarItems }: { navbarItems: NavbarItem[] }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    try {
      logout();
      clearUser();
      router.push("/login");
    } catch (error) {
      console.error("Logout Gagal:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        if (data) setUser(data);
      } catch (error) {
        console.error("Gagal mendapatkan user:", error);
      }
    };
    fetchUser();
  }, []);
  

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="flex justify-between items-center p-3 md:p-5 shadow-md bg-white/80 fixed w-full z-50 px-4 md:px-8 lg:px-16">
      <Link href="/" className="flex items-center">
        <Image
          alt="Logo"
          src="/assets/logo.png"
          width={35}
          height={25}
          priority
          className="w-5 sm:w-7"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 lg:space-x-10 text-primary">
        {navbarItems.map((item, index) => {
          const isActive = pathname === item.link;
          return (
            <Link key={index} href={item.link} className="relative group">
              <span
                className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-1/4 after:h-[2px] after:bg-primary after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 group-hover:after:w-full"}`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm">{user.name}</span>
              <img
                src={user.image || "/assets/user.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl py-2 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="px-4 py-2 flex items-center space-x-2 border-b border-gray-400">
                <img
                  src={user.image || "/assets/user.png"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Lihat Profil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Keluar
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link href="/login">
              <button className="bg-primary px-4 py-2 rounded-xl text-white hover:-translate-y-1 duration-150 ease-in">
                Masuk
              </button>
            </Link>
            <Link href="/signup">
              <button className="text-primary px-4 py-2 rounded-xl border border-primary hover:-translate-y-1 duration-150 ease-in">
                Daftar
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col space-y-1.5 p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-primary transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-700">
            <X size={30} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 p-6">
          {navbarItems.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={index}
                href={item.link}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium ${isActive ? "text-primary" : "text-gray-700"}`}
              >
                {item.title}
              </Link>
            );
          })}
          <div className="pt-6 border-t w-full flex flex-col items-center space-y-4">
            {user ? (
              <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center space-x-3">
                  <img
                    src={user.image || "/assets/user.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-base font-medium">{user.name}</span>
                </div>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className="bg-primary w-full py-3 rounded-xl text-white">Masuk</button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full">
                  <button className="text-primary w-full py-3 rounded-xl border border-primary">Daftar</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
