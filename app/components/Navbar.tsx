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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    try {
      logout();
      clearUser();
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

  const toggleUserDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    
    // Cek apakah dropdown saat ini terbuka
    if (isDropdownOpen) {
      // Jika terbuka, tutup dropdown
      closeUserDropdown();
    } else {
      // Jika tertutup, buka dropdown
      setIsDropdownOpen(true);
    }
  };

  const closeUserDropdown = () => setIsDropdownOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

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
                ${
                  isActive
                    ? "after:w-full"
                    : "after:w-0 group-hover:after:w-full"
                }`}
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
              onClick={toggleUserDropdown}
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

              <span className="block mr-1 font-medium text-theme-sm">
                {user.name}
              </span>

              <svg
                className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
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
              isOpen={isDropdownOpen}
              onClose={closeUserDropdown}
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
                    onItemClick={closeUserDropdown}
                    tag="a"
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                    <svg
                      className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                        fill=""
                      />
                    </svg>
                    Edit profil
                  </DropdownItem>
                </li>
              </ul>
              <Link
                href="/login"
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg
                  className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
                    fill=""
                  />
                </svg>
                Keluar
              </Link>
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
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${
            isDropdownOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-primary transition-opacity duration-300 ${
            isDropdownOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${
            isDropdownOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700"
          >
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
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium ${
                  isActive ? "text-primary" : "text-gray-700"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
          <div className="pt-6 border-t w-full flex flex-col items-center space-y-4">
            {user ? (
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
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
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <button className="bg-primary w-full py-3 rounded-xl text-white">
                    Masuk
                  </button>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <button className="w-full border border-primary py-3 rounded-xl text-primary">
                    Daftar
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
