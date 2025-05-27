"use client";

import OrderTable, { Order } from "@/app/components/OrderTable";
import { fetchAllOrder } from "@/app/utils/order";
// Hapus useRouter karena tidak lagi digunakan untuk navigasi ke detail
// import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import OrderDetailModal from "@/app/components/OrderDetailModal"; // Impor komponen modal baru
import { formatCurrency } from "@/app/utils/helper";

export default function OrderPage() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // --- STATE BARU UNTUK MENGELOLA MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // --- FUNGSI 'VIEW' SEKARANG MEMBUKA MODAL ---
  // Tidak lagi menggunakan router.push
  const handleViewOrderDetails = (orderId: number) => {
    setSelectedOrderId(orderId); // Set ID pesanan yang dipilih
    setIsModalOpen(true);      // Buka modal
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null); // Reset ID saat modal ditutup
  };

  const handleStatusBadge = (orderId: number, newStatus: "Pending" | "Success" | "Canceled") => {}
    // Logika untuk mengupdate status pesanan

  
  // Helper function mapApiStatus (tidak berubah)
  const mapApiStatus = (apiStatus: string): "Pending" | "Success" | "Canceled" => {
    // ... logika Anda tetap sama ...
    const lowerStatus = apiStatus.toLowerCase();
    if (lowerStatus === "success" || lowerStatus === "completed" || lowerStatus === "paid") return "Success";
    if (lowerStatus === "canceled" || lowerStatus === "failed") return "Canceled";
    return "Pending";
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
            const totalQuantity = order.orderItems?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0;
            const totalPrice = order.payment?.amount || 0;
            const productNameString = order.orderItems?.map((item: any) => item.product?.name).filter(Boolean).join(", ") || "Produk tidak tersedia";

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

  if (isLoading) return <div className="p-4 text-center">Loading orders...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (ordersData.length === 0) return <div className="p-4 text-center">No orders found.</div>;

  return (
    // Wrapper div untuk memastikan modal overlay bekerja dengan benar
    <div className="relative">
      <div className="container mx-auto p-4">
        <h1 className="text-lg font-medium mb-6">List Order</h1>
        <OrderTable order={ordersData} onView={handleViewOrderDetails} onStatusChange={handleStatusBadge} />
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