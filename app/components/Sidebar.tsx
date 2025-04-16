"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Home,
  Info,
  ShoppingCart,
  Image as ImageIcon,
  FileText,
  ChevronRight,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [isProdukOpen, setProdukOpen] = useState(false);

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
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
          <SidebarItem icon={<Home size={20} />} text="Beranda" />
          <SidebarItem icon={<Info size={20} />} text="Tentang" />

          {/* Produk with Submenu */}
          <li>
            <button
              onClick={() => setProdukOpen(!isProdukOpen)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              <span className="flex items-center gap-3">
                <ShoppingCart size={20} />
                <span>Produk</span>
              </span>
              {isProdukOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Submenu */}
            {isProdukOpen && (
              <ul className="ml-9 mt-1 space-y-1 text-sm text-gray-600">
                <li>
                  <a href="#" className="block px-2 py-1 hover:text-black">
                    Daftar Produk
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-2 py-1 hover:text-black">
                    Tambah Produk
                  </a>
                </li>
              </ul>
            )}
          </li>

          <SidebarItem icon={<ImageIcon size={20} />} text="Kegiatan" />
          <SidebarItem icon={<FileText size={20} />} text="Laporan P4S" />
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
            <p className="text-sm font-medium">M. Saleh</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <LogOut size={20} className="text-gray-700 cursor-pointer" />
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  text,
  rightIcon,
}: {
  icon: React.ReactNode;
  text: string;
  rightIcon?: React.ReactNode;
}) {
  return (
    <li>
      <a
        href="#"
        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
      >
        <span className="flex items-center gap-3">
          {icon}
          <span>{text}</span>
        </span>
        {rightIcon}
      </a>
    </li>
  );
}
