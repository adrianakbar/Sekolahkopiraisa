// components/OrderCard.tsx
"use client";

import { formatCurrency } from "../utils/helper";

export interface OrderItem {
  productId: number;
  name: string;
  productImage: string;
  quantity: number;
  price: number;
  subtotal: number;
  partner: {
    id: number;
    name: string;
  };
  note: string;
}

interface Order {
  orderId: number;
  statusOrder: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: string;
  payment: {
    method: string;
    statusPembayaran: string;
    amount: number;
  };
}

interface Props {
  order: Order;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        style: "bg-yellow-100 text-yellow-800",
        label: "Dibuat",
      };
    case "PROCESSING":
      return {
        style: "bg-blue-100 text-blue-800",
        label: "Diproses",
      };
    case "SHIPPED":
      return {
        style: "bg-indigo-100 text-indigo-800",
        label: "Dikirim",
      };
    case "DELIVERED":
      return {
        style: "bg-green-100 text-green-800",
        label: "Diterima",
      };
    case "CANCELED":
      return {
        style: "bg-red-100 text-red-800",
        label: "Dibatalkan",
      };
    default:
      return {
        style: "bg-gray-100 text-gray-800",
        label: status,
      };
  }
};

export default function OrderCard({ order }: Props) {
  const badge = getStatusBadge(order.statusOrder);

  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm text-gray-500">
            ID Pesanan: <span className="font-medium">{order.orderId}</span>
          </p>
          <p className="text-sm text-gray-400">
            Tanggal: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${badge.style}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Daftar Produk */}
      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="border-b pb-2 last:border-none">
            <div className="flex items-start gap-3">
              <img
                src={item.productImage}
                alt={item.name}
                className="w-16 h-16 rounded object-cover border"
              />
              <div className="flex justify-between w-full text-sm">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">{item.partner.name}</p>
                  <p className="text-gray-400 text-xs">Catatan: {item.note}</p>
                </div>
                <div className="text-right">
                  <p>
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>
                  <p className="text-gray-700 font-medium">
                    {formatCurrency(item.subtotal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-600 border-t pt-3 flex justify-between">
        <div>
          <p>Alamat: {order.shippingAddress}</p>
          <p>
            Pembayaran: {order.payment.method.replace("_", " ")} (
            {order.payment.statusPembayaran})
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm">Total:</p>
          <p className="text-lg font-medium text-gray-900">
            {formatCurrency(order.payment.amount)}
          </p>
        </div>
      </div>
    </div>
  );
}
