"use client";

import OrderTable, { Order, OrderStatus } from "@/app/components/OrderTable";
import { fetchAllOrder, updateStatusOrder } from "@/app/utils/order";
import { useEffect, useState } from "react";
import OrderDetailModal from "@/app/components/OrderDetailModal";
import { formatCurrency } from "@/app/utils/helper";
import ConfirmModal from "@/app/components/ConfirmModal";
import { FunnelPlus } from "lucide-react";

export default function OrderPage() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<{
    orderId: number;
    newStatus: OrderStatus;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [statusSortOrder, setStatusSortOrder] = useState<"asc" | "desc">("asc");
  const [sortOption, setSortOption] = useState<"newest" | "oldest" | "az">(
    "newest"
  );

  const statusPriority: OrderStatus[] = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
  ];

  // Fungsi map status API ke enum status frontend
  const mapApiStatus = (
    apiStatus: string
  ): OrderStatus => {
    const lower = apiStatus.toLowerCase();
    if (["pending", "created"].includes(lower)) return "PENDING";
    if (["processing"].includes(lower)) return "PROCESSING";
    if (["shipped"].includes(lower)) return "SHIPPED";
    if (["delivered", "success", "completed", "paid"].includes(lower))
      return "DELIVERED";
    if (["canceled", "failed"].includes(lower)) return "CANCELED";
    return "PENDING"; // fallback
  };

  // Ambil data order dari API
  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchAllOrder();
        const rawData = response.data;

        if (!Array.isArray(rawData)) {
          setError("Failed to load orders: Invalid data format.");
          return;
        }

        const processedOrders: Order[] = rawData.map((order: any) => {
          const totalQuantity =
            order.orderItems?.reduce(
              (sum: number, item: any) => sum + (item.quantity || 0),
              0
            ) || 0;
          const totalPrice = order.payment?.amount || 0;
          const productNameString =
            order.orderItems
              ?.map((item: any) => item.product?.name)
              .filter(Boolean)
              .join(", ") || "Produk tidak tersedia";

          return {
            id: order.id,
            customerName: order.user?.name || "N/A",
            productName: productNameString,
            totalQuantity,
            totalPrice: formatCurrency(totalPrice),
            status: mapApiStatus(order.status),
            createdAt: order.created_at,
          };
        });

        setOrdersData(processedOrders);
      } catch (err: any) {
        setError(`Failed to load orders: ${err.message || "Unknown error"}`);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, []);

  // Sort orders sesuai filter dropdown dan status sort
  const sortedOrders = [...ordersData].sort((a, b) => {
    // Sort berdasarkan pilihan filter utama (newest, oldest, az)
    if (sortOption === "newest" || sortOption === "oldest") {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (aDate !== bDate) {
        return sortOption === "newest" ? bDate - aDate : aDate - bDate;
      }
    }

    if (sortOption === "az") {
      const aName = a.customerName.toLowerCase();
      const bName = b.customerName.toLowerCase();
      if (aName !== bName) return aName < bName ? -1 : 1;
    }

    // Jika masih sama, urutkan berdasarkan status
    const aStatusIndex = statusPriority.indexOf(a.status);
    const bStatusIndex = statusPriority.indexOf(b.status);
    return statusSortOrder === "asc"
      ? aStatusIndex - bStatusIndex
      : bStatusIndex - aStatusIndex;
  });

  // Handler tombol lihat detail
  const handleViewOrderDetails = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  // Handler perubahan status pesanan (buka konfirmasi)
  const handleStatusBadge = (orderId: number, newStatus: OrderStatus) => {
    setPendingStatus({ orderId, newStatus });
    setIsConfirmOpen(true);
  };

  // Konfirmasi perubahan status
  const confirmStatusChange = async () => {
    if (!pendingStatus) return;

    try {
      setIsSubmitting(true);
      await updateStatusOrder(pendingStatus.orderId, pendingStatus.newStatus);

      setOrdersData((prev) =>
        prev.map((order) =>
          order.id === pendingStatus.orderId
            ? { ...order, status: pendingStatus.newStatus }
            : order
        )
      );
    } catch (error: any) {
      console.error("Gagal update status:", error);
      alert(error.message || "Gagal mengubah status pesanan.");
    } finally {
      setIsSubmitting(false);
      setIsConfirmOpen(false);
      setPendingStatus(null);
    }
  };

  // Toggle status sort (asc / desc)
  function toggleStatusSort(): void {
    setStatusSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  if (isLoading)
    return <div className="p-4 text-center">Loading orders...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (ordersData.length === 0)
    return <div className="p-4 text-center">No orders found.</div>;

  return (
    <div className="">
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setPendingStatus(null);
        }}
        onConfirm={confirmStatusChange}
        title="Konfirmasi Perubahan Status"
        description={`Apakah Anda yakin ingin mengubah status pesanan menjadi "${pendingStatus?.newStatus}"?`}
        isSubmitting={isSubmitting}
      />

      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-medium ">List Order</h1>

          <div className="relative hover:-translate-y-1 duration-150 ease-in">
            <select
              value={sortOption}  
              onChange={(e) =>
                setSortOption(e.target.value as "newest" | "oldest" | "az")
              }
              className="appearance-none border border-gray-500 rounded-xl px-4 py-1.5 text-sm pr-8"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="az">Judul A-Z</option>
            </select>
            <FunnelPlus
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        <OrderTable
          order={sortedOrders}
          onView={handleViewOrderDetails}
          onStatusChange={handleStatusBadge}
          onToggleStatusSort={toggleStatusSort}
          statusSortOrder={statusSortOrder}
        />
      </div>

      <OrderDetailModal
        isOpen={isModalOpen}
        orderId={selectedOrderId}
        onClose={handleCloseModal}
      />
    </div>
  );
}
