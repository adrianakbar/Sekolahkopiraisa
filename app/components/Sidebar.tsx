"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  LogOut,
  Menu,
  Store,
  X,
  List,
  PlusCircle,
  Package,
  Handshake,
  NotepadText,
} from "lucide-react";
import clsx from "clsx";
import { logout } from "../utils/auth";
import { getUser } from "../utils/user";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmModal from "./ConfirmModal";

interface SidebarItemType {
  icon: React.ReactNode;
  text: string;
  href: string;
}
interface User {
  name: string;
  image: string;
}

export default function Sidebar({ items }: { items: SidebarItemType[] }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isProdukOpen, setProdukOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleLogout = () => {
    setShowConfirmModal(true);
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

  const renderSidebarContent = (isMobile = false) => (
    <div
      className={clsx(
        "bg-white h-full shadow-lg flex flex-col justify-between duration-300",
        isMobile ? "w-64" : isSidebarOpen ? "w-50" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <Image src="/assets/logo.png" alt="Logo" width={20} height={20} />
        {isMobile ? (
          <button onClick={() => setMobileOpen(false)}>
            <X />
          </button>
        ) : (
          <div
            className="relative w-6 h-6 cursor-pointer"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu
              className={clsx(
                "absolute transition-all duration-300",
                isSidebarOpen
                  ? "opacity-0 scale-90 rotate-45"
                  : "opacity-100 scale-100 rotate-0"
              )}
            />
            <X
              className={clsx(
                "absolute transition-all duration-300",
                isSidebarOpen
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-90 -rotate-45"
              )}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-3">
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              text={item.text}
              href={item.href}
              isActive={pathname === item.href}
              isSidebarOpen={isMobile ? true : isSidebarOpen}
            />
          ))}

          {/* Submenu */}
          <li>
            <button
              onClick={() => setProdukOpen(!isProdukOpen)}
              className={clsx(
                "cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition",
                !isMobile && !isSidebarOpen && "justify-center"
              )}
            >
              <span className="flex items-center gap-3 text-sm">
                <Store size={20} />
                {(isMobile || isSidebarOpen) && <span>Toko</span>}
              </span>
              {(isMobile || isSidebarOpen) &&
                (isProdukOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                ))}
            </button>

            <AnimatePresence initial={false}>
              {isProdukOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-5 mt-1 space-y-1 text-sm text-gray-600 overflow-hidden"
                >
                  <LinkItem
                    href="/admin/product"
                    pathname={pathname}
                    label={
                      <span className="flex items-center gap-2">
                        <Package size={20} />
                        Produk
                      </span>
                    }
                  />
                  <LinkItem
                    href="/admin/partner"
                    pathname={pathname}
                    label={
                      <span className="flex items-center gap-2">
                        <Handshake size={20} />
                        Mitra
                      </span>
                    }
                  />
                  <LinkItem
                    href="/admin/order"
                    pathname={pathname}
                    label={
                      <span className="flex items-center gap-2">
                        <NotepadText size={20} />
                        Order
                      </span>
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="cursor-pointer px-3 py-3 bg-gray-100 flex items-center justify-between rounded-t-xl">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            router.push("/admin/profile");
          }}
        >
          <Image
            src={user?.image || "/assets/avatar.png"}
            alt="avatar"
            width={35}
            height={35}
            className="rounded-full"
          />
          {(isMobile || isSidebarOpen) && (
            <div>
              <p className="text-xs font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
        <LogOut
          size={20}
          className="text-gray-700 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block">{renderSidebarContent()}</aside>
      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={async () => {
            await logout();
            router.replace("/login");
            setShowConfirmModal(false);
          }}
          title="Konfirmasi Logout"
          description="Apakah Anda yakin ingin Logout?"
        />
      )}

      {/* Mobile Sidebar (overlay) */}
      <div className="md:hidden">
        {/* Hamburger button - only show when sidebar is closed */}
        {!isMobileOpen && (
          <button
            className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </button>
        )}

        {/* Sidebar overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="fixed inset-0 z-40 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}
                className="relative z-50 w-64 bg-white h-full shadow-lg"
              >
                {renderSidebarContent(true)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function SidebarItem({
  icon,
  text,
  href,
  isActive,
  isSidebarOpen,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  isActive: boolean;
  isSidebarOpen: boolean;
}) {
  return (
    <li>
      <Link href={href}>
        <div
          className={clsx(
            "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer text-sm",
            isActive
              ? "bg-primary text-white font-medium shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            !isSidebarOpen && "justify-center"
          )}
        >
          {icon}
          {isSidebarOpen && <span>{text}</span>}
        </div>
      </Link>
    </li>
  );
}

function LinkItem({
  href,
  pathname,
  label,
}: {
  href: string;
  pathname: string;
  label: React.ReactNode;
}) {
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <span
        className={clsx(
          "block px-2 py-1 rounded-xl transition",
          isActive ? "text-black bg-gray-100 font-medium" : "hover:text-black"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
