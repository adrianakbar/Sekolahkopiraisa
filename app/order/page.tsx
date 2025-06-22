// app/order/page.tsx

"use client";

import { useEffect, useState } from "react";
import { fetchMyOrder } from "../utils/order";
import OrderCard, { OrderItem } from "../components/OrderCard";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Update the OrderStatus type to include all possible statuses
type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const router = useRouter();

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

  const handleDetailClick = (orderId: number) => {
    router.push(`/order/${orderId}`);
  };

  // Filter orders based on active tab
  const filteredOrders =
    activeTab === "ongoing"
      ? orders.filter((order) =>
          ["PENDING", "PROCESSING", "SHIPPED"].includes(order.statusOrder)
        )
      : orders.filter((order) =>
          ["DELIVERED", "CANCELED"].includes(order.statusOrder)
        );

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when switching tabs
  const handleTabChange = (tab: "ongoing" | "history") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Update the empty state message
  const getEmptyMessage = () => {
    if (activeTab === "ongoing") {
      return "Tidak ada pesanan yang sedang berjalan.";
    } else {
      return "Belum ada riwayat pesanan selesai atau dibatalkan.";
    }
  };

  return (
    <div className="bg-secondary min-h-screen p-4">
      <div className="max-w-7xl mx-auto pt-20">
        <h1 className="text-lg font-medium mb-4">Pesanan Saya</h1>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleTabChange("ongoing")}
            className={`px-4 py-2 rounded-xl font-medium ${
              activeTab === "ongoing"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Sedang Berjalan
          </button>
          <button
            onClick={() => handleTabChange("history")}
            className={`px-4 py-2 rounded-xl font-medium ${
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
          <p className="text-gray-500">{getEmptyMessage()}</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {currentOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="cursor-pointer"
                  onClick={() => handleDetailClick(order.orderId)}
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center space-y-4">
                {/* Pagination Info */}
                <div className="text-sm text-gray-600">
                  Menampilkan {startIndex + 1}-
                  {Math.min(endIndex, filteredOrders.length)} dari{" "}
                  {filteredOrders.length} pesanan
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-1">
                  {/* Previous Button */}
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span key={index} className="px-3 py-2 text-gray-500">
                          ...
                        </span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => goToPage(page as number)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${
                            currentPage === page
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
