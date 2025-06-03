// components/OrderCard.tsx
"use client";

import { formatCurrency } from "../utils/helper";

interface OrderItem {
  productId: number;
  name: string;
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

export default function OrderCard({ order }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
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
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            order.statusOrder === "SUCCESS"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.statusOrder}
        </span>
      </div>

      {/* Daftar Produk */}
      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="border-b pb-2 last:border-none">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500">{item.partner.name}</p>
                <p className="text-gray-400 text-xs">Catatan: {item.note}</p>
              </div>
              <div className="text-right">
                <p>
                  {item.quantity} x {formatCurrency(item.price)}
                </p>
                <p className="text-gray-700 font-semibold">
                  {formatCurrency(item.subtotal)}
                </p>
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
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(order.payment.amount)}
          </p>
        </div>
      </div>
    </div>
  );
}
