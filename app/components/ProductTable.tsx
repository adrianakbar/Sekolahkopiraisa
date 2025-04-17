import {
    FileText,
    Pencil,
    Trash,
    Loader,
    CheckCircle,
    XCircle,
  } from "lucide-react";
  
  interface Product  {
    name: string;
    id: string;
    category: string;
    qty: number;
    amount: string;
    status: "Pending" | "Success" | "Canceled";
  };
  
  export default function ProductTable({ data }: { data: Product[] }) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.id}</div>
                </td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">{item.qty}</td>
                <td className="px-4 py-3">{item.amount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <FileText size={16} />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Pencil size={16} />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  function StatusBadge({ status }: { status: string }) {
    let style = "";
    let icon = null;
  
    switch (status) {
      case "Pending":
        style = "bg-yellow-100 text-yellow-800";
        icon = <Loader size={14} className="animate-spin mr-1" />;
        break;
      case "Success":
        style = "bg-green-100 text-green-800";
        icon = <CheckCircle size={14} className="mr-1" />;
        break;
      case "Canceled":
        style = "bg-red-100 text-red-800";
        icon = <XCircle size={14} className="mr-1" />;
        break;
    }
  
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${style}`}
      >
        {icon}
        {status}
      </span>
    );
  }
  