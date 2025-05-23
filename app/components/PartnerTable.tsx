import { SquarePen, Trash } from "lucide-react";

export interface PartnerListProps {
  id: number;
  name: string;
  owner_name: string;
  phone_number: string;
  address: string;
  products: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PartnerTable({
  data,
  onEdit,
  onDelete,
}: {
  data: PartnerListProps[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-sm text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Nama Mitra</th>
            <th className="px-4 py-3 text-left font-medium">Nama Pemilik</th>
            <th className="px-4 py-3 text-left font-medium">No. Telpon</th>
            <th className="px-4 py-3 text-left font-medium">Alamat</th>
            <th className="px-4 py-3 text-left font-medium">
              Produk Terdaftar
            </th>
            <th className="px-4 py-3 text-left font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
          {data.map((item, idx) => (
            <tr key={idx}>
              <td className="px-4 py-3">
                <div className=" text-gray-900">{item.name}</div>
                {/* <div className="text-xs text-gray-500">
                                    {item.id}
                                </div> */}
              </td>
              <td className="px-4 py-3">{item.owner_name}</td>
              <td className="px-4 py-3">
                <span className="inline-block bg-yellow-100 px-2 py-1 rounded-xl text-gray-900">
                  {item.phone_number}
                </span>
              </td>

              <td className="px-4 py-3">{item.address}</td>
              <td className="px-4 py-3">{item.products}</td>
              <td className="px-4 py-3">
                {/* Edit */}
                <button
                  onClick={() => onEdit?.(item.id)}
                  className="cursor-pointer p-2 text-white rounded-xl bg-blue-500 hover:-translate-y-1 duration-150 ease-in"
                  title="Edit"
                >
                  <SquarePen size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
