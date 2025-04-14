"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUser } from "../utils/user";
import { X } from "lucide-react";
import { logout } from "../utils/auth";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "../stores/userStore";
import { Dropdown } from "./Dropdown";
import { DropdownItem } from "./DropdownItem";

interface NavbarItem {
  title: string;
  link: string;
}

interface User {
  name: string;
  image: string;
  email: string;
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

  const toggleDropdown = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsMenuOpen(false);
  };

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
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-700 dark:text-gray-400"
            >
              <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
                <Image
                  width={44}
                  height={44}
                  src={user.image || "/assets/user.png"}
                  alt={user.name}
                />
              </span>

              <span className="block mr-1 font-medium text-theme-sm">{user.name}</span>

              <svg
                className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Dropdown
              isOpen={isMenuOpen}
              onClose={closeDropdown}
              className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
            >
              <div>
                <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                  {user.name}
                </span>
                <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                  {user.email || "user@example.com"}
                </span>
              </div>

              <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                <li>
                  <DropdownItem
                    onItemClick={closeDropdown}
                    tag="a"
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    Edit profile
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    onItemClick={closeDropdown}
                    tag="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    Keluar
                  </DropdownItem>
                </li>
              </ul>
            </Dropdown>
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
                  <button className="w-full border border-primary py-3 rounded-xl text-primary">Daftar</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
