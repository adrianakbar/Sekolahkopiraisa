// app/order/page.tsx

"use client";

import { useEffect, useState } from "react";
import { fetchMyOrder } from "../utils/order"; // pastikan path-nya sesuai
import OrderCard, { OrderItem } from "../components/OrderCard";

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "SUCCESS" | string;


interface Order {
  orderId: number;
  statusOrder: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: string;
  payment: {
    method: string;
    statusPembayaran: string;
    amount: number;
  };
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"ongoing" | "history">("ongoing");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const result = await fetchMyOrder();
        setOrders(result.orders || []);
      } catch (err) {
        console.error("Gagal memuat pesanan", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders =
    activeTab === "ongoing"
      ? orders.filter((order) => order.statusOrder !== "SUCCESS")
      : orders.filter((order) => order.statusOrder === "SUCCESS");

  return (
    <div className="bg-secondary">

    <div className="max-w-7xl mx-auto pt-25">
      <h1 className="text-lg font-medium mb-4">Pesanan Saya</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "ongoing"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Sedang Berjalan
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "history"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Riwayat Pesanan
        </button>
      </div>

      {loading ? (
        <p>Memuat pesanan...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">
          {activeTab === "ongoing"
            ? "Tidak ada pesanan yang sedang berjalan."
            : "Belum ada riwayat pesanan."}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </div>
    </div>

  );
}
