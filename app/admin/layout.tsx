import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import {
  LayoutDashboard,
  CalendarCheck,
  Building,
  FileText,
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, text: "Dashboard", href: "/admin" },
    { icon: <CalendarCheck size={20} />, text: "Kegiatan", href: "/admin/activity" },
    { icon: <Building size={20} />, text: "Perusahaan", href: "/company" },
    { icon: <FileText size={20} />, text: "Laporan P4S", href: "/form" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
