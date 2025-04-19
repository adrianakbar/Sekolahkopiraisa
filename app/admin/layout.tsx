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
    {
      icon: <CalendarCheck size={20} />,
      text: "Kegiatan",
      href: "/admin/activity",
    },
    {
      icon: <Building size={20} />,
      text: "Perusahaan",
      href: "/admin/company",
    },
    { icon: <FileText size={20} />, text: "Laporan P4S", href: "/admin/form" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 h-screen overflow-y-auto p-6">{children}</main>
    </div>
  );
}
