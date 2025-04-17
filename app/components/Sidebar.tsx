"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, ChevronDown, LogOut, Menu, Store } from "lucide-react";
import { useUserStore } from "../stores/userStore";
import { logout } from "../utils/auth";

interface SidebarItemType {
  icon: ReactNode;
  text: string;
  href: string;
}

export default function Sidebar({ items }: { items: SidebarItemType[] }) {
  const [isProdukOpen, setProdukOpen] = useState(false);
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
      clearUser();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col justify-between shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <Image src="/assets/logo.png" alt="Logo" width={24} height={24} />
        <Menu className="text-[#57270D] cursor-pointer" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              text={item.text}
              href={item.href}
              isActive={pathname === item.href}
            />
          ))}

          {/* Submenu */}
          <li>
            <button
              onClick={() => setProdukOpen(!isProdukOpen)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              <span className="flex items-center gap-3">
                <Store size={20} />
                <span>Toko</span>
              </span>
              {isProdukOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {isProdukOpen && (
              <ul className="ml-9 mt-1 space-y-1 text-sm text-gray-600">
                <li>
                  <Link href="/produk">
                    <span
                      className={`block px-2 py-1 rounded transition ${
                        pathname === "/produk"
                          ? "text-black bg-gray-100 font-medium"
                          : "hover:text-black"
                      }`}
                    >
                      Daftar Produk
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/produk/tambah">
                    <span
                      className={`block px-2 py-1 rounded transition ${
                        pathname === "/produk/tambah"
                          ? "text-black bg-gray-100 font-medium"
                          : "hover:text-black"
                      }`}
                    >
                      Tambah Produk
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 bg-gray-100 flex items-center justify-between rounded-t-xl">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <LogOut
          size={20}
          className="text-gray-700 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  text,
  href,
  isActive,
}: {
  icon: ReactNode;
  text: string;
  href: string;
  isActive: boolean;
}) {
  return (
    <li>
      <Link href={href}>
        <div
          className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
            isActive
              ? "bg-gray-100 text-black font-semibold shadow-sm"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <span className="flex items-center gap-3">
            {icon}
            <span>{text}</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
