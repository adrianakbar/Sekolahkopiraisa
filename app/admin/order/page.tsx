"use client";

import OrderTable, { Order, OrderStatus } from "@/app/components/OrderTable";
import { fetchAllOrder, updateStatusOrder } from "@/app/utils/order";
// Hapus useRouter karena tidak lagi digunakan untuk navigasi ke detail
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderDetailModal from "@/app/components/OrderDetailModal"; // Impor komponen modal baru
import { formatCurrency } from "@/app/utils/helper";
import ConfirmModal from "@/app/components/ConfirmModal";

export default function OrderPage() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- STATE BARU UNTUK MENGELOLA MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<{
    orderId: number;
    newStatus: OrderStatus;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FUNGSI 'VIEW' SEKARANG MEMBUKA MODAL ---
  // Tidak lagi menggunakan router.push
  const handleViewOrderDetails = (orderId: number) => {
    setSelectedOrderId(orderId); // Set ID pesanan yang dipilih
    setIsModalOpen(true); // Buka modal
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null); // Reset ID saat modal ditutup
  };

  const handleStatusBadge = (orderId: number, newStatus: OrderStatus) => {
    setPendingStatus({ orderId, newStatus });
    setIsConfirmOpen(true);
  };

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

  // Helper function mapApiStatus (tidak berubah)
  const mapApiStatus = (
    apiStatus: string
  ): "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED" => {
    const lower = apiStatus.toLowerCase();

    if (["pending", "created"].includes(lower)) return "PENDING";
    if (["processing"].includes(lower)) return "PROCESSING";
    if (["shipped"].includes(lower)) return "SHIPPED";
    if (["delivered", "success", "completed", "paid"].includes(lower))
      return "DELIVERED";
    if (["canceled", "failed"].includes(lower)) return "CANCELED";

    return "PENDING"; // fallback
  };

  // useEffect untuk fetch data (tidak berubah)
  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchAllOrder();
        const rawData = response.data;

        if (!Array.isArray(rawData)) {
          // ... penanganan error ...
          setError("Failed to load orders: Invalid data format.");
          return;
        }

        const processedOrders: Order[] = rawData.map((order: any) => {
          // ... logika .map Anda tetap sama ...
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
            totalQuantity: totalQuantity,
            totalPrice: formatCurrency(totalPrice),
            status: mapApiStatus(order.status),
          };
        });

        setOrdersData(processedOrders);
      } catch (err: any) {
        // ... penanganan error ...
        setError(`Failed to load orders: ${err.message || "Unknown error"}`);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, []);

  if (isLoading)
    return <div className="p-4 text-center">Loading orders...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (ordersData.length === 0)
    return <div className="p-4 text-center">No orders found.</div>;

  return (
    // Wrapper div untuk memastikan modal overlay bekerja dengan benar
    <div className="relative">
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

      <div className="container mx-auto p-4">
        <h1 className="text-lg font-medium mb-6">List Order</h1>
        <OrderTable
          order={ordersData}
          onView={handleViewOrderDetails}
          onStatusChange={handleStatusBadge}
        />
      </div>

      {/* RENDER MODAL DI SINI */}
      {/* Modal ini hanya akan terlihat jika isModalOpen bernilai true */}
      <OrderDetailModal
        isOpen={isModalOpen}
        orderId={selectedOrderId}
        onClose={handleCloseModal}
      />
    </div>
  );
}
