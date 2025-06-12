"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cancelOrder, fetchMyOrder } from "@/app/utils/order";
import { UserItem } from "@/app/types/userType";
import Popup from "@/app/components/Popup";
import ConfirmModal from "@/app/components/ConfirmModal";
import ReasonModal from "@/app/components/ReasonModal";

interface OrderData {
    orderId: number;
    statusOrder: string;
    createdAt: string;
    items: any[];
    shippingAddress: string;
    payment: {
        method: string;
        statusPembayaran: string;
        amount: number;
    };
}

export default function OrderDetailPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [popupType, setPopupType] = useState<"success" | "error">("success");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [reportCencelOrder, setReportCencelOrder] = useState<number | null>(null);
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const response = await fetchMyOrder(); // Gets the response with message and orders array

                if (!response.orders || !Array.isArray(response.orders)) {
                    throw new Error("Invalid response format");
                }

                // Find the specific order with matching orderId from all orders
                const orderData = response.orders.find(
                    (order: OrderData) => order.orderId.toString() === id
                );

                if (!orderData) {
                    throw new Error("Order not found");
                }

                setOrder(orderData);
            } catch (err) {
                console.error("Error fetching order:", err);
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderData();
        }
    }, [id]);

    const handleCancelOrder = async () => {
        if (!order) return;

        try {
            setLoading(true);
            const response = await cancelOrder(order.orderId, cancelReason);

            if (response.success) {
                setMessage("Pesanan berhasil dibatalkan");
                setPopupType("success");
                setShowPopup(true);
                router.push("/order");
            } else {
                throw new Error(response.message || "Gagal membatalkan pesanan");
            }
        } catch (err) {
            console.error("Error cancelling order:", err);
            setMessage(
                err instanceof Error ? err.message : "An error occurred"
            );
            setPopupType("error");
            setShowPopup(true);
        } finally {
            setLoading(false);
        }
    }


    if (loading)
        return (
            <div className="min-h-screen bg-[#fcfbf8] pt-20 text-center">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="min-h-screen bg-[#fcfbf8] pt-20 text-center text-red-600">
                {error}
            </div>
        );
    if (!order)
        return (
            <div className="min-h-screen bg-[#fcfbf8] pt-20 text-center">
                Order not found
            </div>
        );

    return (
        <div className="min-h-screen bg-[#fcfbf8] pt-20">
            {showPopup && (
            <Popup
                message={message}
                type={popupType}
                onClose={() => setShowPopup(false)}
            />
            )}
            <ReasonModal 
                isOpen={showReasonModal}
                onClose={() => setShowReasonModal(false)}
                onSubmit={(reason) => {
                    setCancelReason(reason);
                    setShowReasonModal(false);
                    setShowConfirmModal(true);
                    setReportCencelOrder(order.orderId);
                }}
            />

            <ConfirmModal
            title="Batalkan Pesanan"
            description={`Apakah Anda yakin ingin membatalkan pesanan ini?\nAlasan: ${cancelReason}`}
            isOpen={showConfirmModal}
            onClose={() => {
                setShowConfirmModal(false);
                setReportCencelOrder(null);
                setCancelReason("");
            }}
            onConfirm={() => {
                if (reportCencelOrder !== null) {
                    handleCancelOrder(); // Update function name here
                }
                setShowConfirmModal(false);
                setReportCencelOrder(null);
                setCancelReason("");
            }}
            />
            <div className="container mx-auto px-4">
                <div className="border rounded-lg bg-white p-6">
                    <div className="space-y-2">
                        {/* Order Number Section */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold text-lg">
                                    No. Pesanan
                                </h2>
                                <p className="text-gray-600">{order.orderId}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                ${order.statusOrder === "PENDING" 
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.statusOrder === "PROCESSING"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.statusOrder === "SHIPPED"
                                    ? "bg-indigo-100 text-indigo-800"
                                    : order.statusOrder === "DELIVERED"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                            >
                                {order.statusOrder === "PENDING" 
                                    ? "Dibuat"
                                    : order.statusOrder === "PROCESSING"
                                    ? "Diproses"
                                    : order.statusOrder === "SHIPPED"
                                    ? "Dikirim"
                                    : order.statusOrder === "DELIVERED"
                                    ? "Diterima"
                                    : "Dibatalkan"}
                            </span>
                        </div>

                        {/* Transaction Date */}
                        <div>
                            <h2 className="font-semibold text-lg">
                                Tanggal Transaksi
                            </h2>
                            <p className="text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString(
                                    "id-ID"
                                )}
                            </p>
                        </div>

                        {/* Shipping Address */}
                        <div>
                            <h2 className="font-semibold text-lg">
                                Alamat Pengiriman
                            </h2>
                            <div className="flex">
                                <div className="w-2/5 pr-4">
                                    <p className="font-medium">Aulia Putri</p>
                                    <p className="text-gray-600">
                                        (+62) 812345678
                                    </p>
                                </div>
                                <div className="w-3/5">
                                    <p className="text-gray-600">
                                        {order.shippingAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mt-6 border">
                    <div className="mt-6"></div>
                    {/* Product Details Header */}
                    <div className="grid grid-cols-12 pb-2 border-b">
                        <div className="col-span-6">
                            <h2 className="font-semibold text-gray-600">
                                Detail Produk
                            </h2>
                        </div>
                        <div className="col-span-3 text-center">
                            <h2 className="font-semibold text-gray-600">
                                Harga
                            </h2>
                        </div>
                        <div className="col-span-3 text-right">
                            <h2 className="font-semibold text-gray-600">
                                Total Harga
                            </h2>
                        </div>
                    </div>

                    {/* Product Items */}
                    {order.items.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="grid grid-cols-12 py-4 items-center border-b"
                        >
                            <div className="col-span-6 flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-medium">{item.name}</h3>
                                </div>
                            </div>
                            <div className="col-span-3 text-center">
                                <p>Rp {item.price.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="col-span-3 text-right">
                                <p>
                                    Rp{" "}
                                    {(
                                        item.price * item.quantity
                                    ).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Total */}
                    <div className="flex justify-end mt-4">
                        <div className="w-1/3">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Total:</span>
                                <span className="font-semibold">
                                    Rp{" "}
                                    {order.payment.amount.toLocaleString(
                                        "id-ID"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mt-6 border flex flex-col md:flex-row justify-between items-start">
                    <h2 className="font-semibold text-lg w-1/5">
                        Metode Pembayaran
                    </h2>
                    <div className="text-lg w-4/5">
                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium 
                                ${
                                    order.payment.method === "BANK_TRANSFER"
                                        ? "bg-blue-100 text-blue-800"
                                        : order.payment.method === "QRIS"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                }
                                `}
                        >
                            {order.payment.method.replace(/_/g, " ")}
                        </span>
                    </div>
                </div>
                <div className="bg-[#fcfbf8] p-6 mt-6 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                            Total Pembayaran:
                        </span>
                        <span className="text-xl font-bold">
                            Rp {order.payment.amount.toLocaleString("id-ID")}
                        </span>
                    </div>
                    {order.statusOrder === "PENDING" && (
                        <button
                            onClick={() => setShowReasonModal(true)}
                            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Batalkan Pesanan
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
