import { Loader, CheckCircle, XCircle, Expand, ChevronDown } from "lucide-react";
import { useState } from "react";

// Interface untuk setiap item pesanan (tidak berubah)
export interface Order {
  id: number; // Ini adalah customerId dalam konteks data yang dikelompokkan
  customerName: string;
  productName: string;
  totalQuantity: number;
  totalPrice: string;
  status: "Pending" | "Success" | "Canceled";
  notes?: string; // Menambahkan field notes
  partnerName?: string; // Menambahkan field partnerName
  price?: number; // Menambahkan field price
  quantity?: number; // Menambahkan field quantity
}

// Tipe untuk status yang valid
type OrderStatus = "Pending" | "Success" | "Canceled";
const ALL_STATUSES: OrderStatus[] = ["Pending", "Success", "Canceled"];

// Props untuk OrderTable, ditambahkan onStatusChange
interface OrderTableProps {
  order: Order[];
  onView: (id: number) => void;
  onStatusChange: (id: number, newStatus: OrderStatus) => void; // Fungsi untuk update status
}

// Komponen StatusDropdown baru
function StatusDropdown({
  currentStatus,
  orderId,
  onStatusChange,
}: {
  currentStatus: OrderStatus;
  orderId: number;
  onStatusChange: (id: number, newStatus: OrderStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectStatus = (newStatus: OrderStatus) => {
    if (newStatus !== currentStatus) {
      onStatusChange(orderId, newStatus);
    }
    setIsOpen(false);
  };

  let statusColorClass = "";
  let statusIcon = null;

  switch (currentStatus) {
    case "Pending":
      statusColorClass = "bg-yellow-100 text-yellow-800";
      statusIcon = <Loader size={14} className="animate-spin mr-1.5" />;
      break;
    case "Success":
      statusColorClass = "bg-green-100 text-green-800";
      statusIcon = <CheckCircle size={14} className="mr-1.5" />;
      break;
    case "Canceled":
      statusColorClass = "bg-red-100 text-red-800";
      statusIcon = <XCircle size={14} className="mr-1.5" />;
      break;
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex items-center justify-center w-full rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none ${statusColorClass}`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {statusIcon}
          {currentStatus}
          <ChevronDown size={16} className="ml-1 -mr-0.5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {ALL_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => handleSelectStatus(status)}
                className={`${
                  status === currentStatus
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } group flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
              >
                {/* Opsi untuk ikon di dropdown, bisa ditambahkan jika perlu */}
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderTable({ order, onView, onStatusChange }: OrderTableProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-sm text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Nama Customer</th>
            <th className="px-4 py-3 text-left font-medium">Nama Produk</th>
            <th className="px-4 py-3 text-left font-medium">Quantity Total</th>
            <th className="px-4 py-3 text-left font-medium">Total Harga</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
          {order.map((item) => ( // Menggunakan item.id sebagai key lebih baik
            <tr key={item.id}>
              <td className="px-4 py-3">{item.customerName}</td>
              <td className="px-4 py-3">{item.productName}</td>
              <td className="px-4 py-3">{item.totalQuantity}</td>
              <td className="px-4 py-3">{item.totalPrice}</td>
              <td className="px-4 py-3">
                {/* Mengganti StatusBadge dengan StatusDropdown */}
                <StatusDropdown
                  currentStatus={item.status}
                  orderId={item.id} // item.id di sini adalah customerId
                  onStatusChange={onStatusChange}
                />
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onView(item.id)}
                  className="cursor-pointer p-2 text-white rounded-xl bg-primary hover:-translate-y-1 duration-150 ease-in" // Menggunakan bg-blue-500
                  title="View"
                >
                  <Expand size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
