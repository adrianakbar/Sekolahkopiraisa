import { Phone, SquarePen, Trash } from "lucide-react";
import { useState } from "react";

export interface PartnerListProps {
  id: number;
  name: string;
  owner_name: string;
  phone_number: string;
  address: string;
  products: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCall?: (id: string) => void;
}

export default function PartnerTable({
  partner,
  onEdit,
  onDelete,
  onCall,
}: {
  partner: PartnerListProps[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onCall?: (id: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(partner.length / itemsPerPage);

  // Data untuk halaman sekarang saja
  const currentData = partner.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  return (
    <div className="bg-tertiary shadow rounded-xl overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primary text-sm text-white">
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
          {currentData.map((item, idx) => (
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
              <td className="px-4 py-3 ">
                {/* Edit */}
                <button
                  onClick={() => onEdit?.(item.id)}
                  className="cursor-pointer p-2 text-white rounded-xl bg-blue-500 hover:-translate-y-1 duration-150 ease-in"
                  title="Edit"
                >
                  <SquarePen size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center items-center flex-wrap gap-2 mt-4 px-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-xl border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-xl border ${
                page === currentPage
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-xl border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      ;
    </div>
  );
}
