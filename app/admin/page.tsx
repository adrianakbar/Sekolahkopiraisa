"use client";

import { CalendarCheck, Building, Store } from "lucide-react";
import ProductTable from "../components/ProductTable";
import { useUserStore } from "../stores/userStore";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* Greeting */}
      <h1 className="text-2xl font-bold mb-4">{user?.name}</h1>
      <p className="text-gray-600 mb-8">Ini adalah ringkasan dashboardmu hari ini.</p>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<CalendarCheck size={28} className="text-blue-500" />}
          title="Total Kegiatan"
          value="12"
        />
        <StatCard
          icon={<Building size={28} className="text-green-500" />}
          title="Total Perusahaan"
          value="8"
        />
        <StatCard
          icon={<Store size={28} className="text-orange-500" />}
          title="Total Produk"
          value="24"
        />
      </div>

      {/* Grafik dan Produk Terbaru */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grafik Kegiatan */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Mingguan</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* Kamu bisa taruh grafik beneran di sini pakai chart library */}
            Grafik Dummy
          </div>
        </div>

        {/* Produk Terbaru */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Produk Terbaru</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between">
              <span>Produk A</span>
              <span className="text-gray-500 text-sm">2 hari lalu</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>Produk B</span>
              <span className="text-gray-500 text-sm">5 hari lalu</span>
            </li>
            <li className="py-3 flex justify-between">
              <span>Produk C</span>
              <span className="text-gray-500 text-sm">1 minggu lalu</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <ProductTable 
        data={[
          { id: "1", name: "Produk A", category: "Kategori 1", qty: 10, amount: "$100", status: "Canceled" },
          { id: "2", name: "Produk B", category: "Kategori 2", qty: 5, amount: "$50", status: "Pending" },
          { id: "3", name: "Produk C", category: "Kategori 3", qty: 20, amount: "$200", status: "Success" },
          { id: "4", name: "Produk D", category: "Kategori 4", qty: 15, amount: "$150", status: "Canceled" },
        ]}
        />
      </div>
    </main>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
