import Image from "next/image";
import { Pencil, SquarePen, Trash } from "lucide-react";

export interface ProductListProps {
  id: number;
  image: string;
  name: string;
  price: string;
  stock: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ProductListAdmin({
  id,
  image,
  name,
  price,
  stock,
  onEdit,
  onDelete,
}: ProductListProps) {
  return (
    <div className="cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gray-300 p-3 flex flex-col justify-between bg-white relative">
      {/* Availability Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`px-2 py-1 rounded-full text-xs ${
          stock > 0 
            ? "bg-green-200 text-green-800" 
            : "bg-red-200 text-red-800"
        }`}>
          {stock > 0 ? "Tersedia" : "Habis"}
        </span>
      </div>

      <div className="relative w-full h-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="mt-3 flex flex-col justify-between flex-grow text-sm">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-black leading-snug">{name}</h2>
            <p className="text-gray-500">
              Stok: {stock}
            </p>
          </div>
          <p className="font-medium text-primary mt-1">
            Rp {Number(price).toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex justify-end md:items-center space-x-2 mt-3 md:mt-0">
          {/* Edit */}
          <button
            onClick={() => onEdit?.(id)}
            className="cursor-pointer p-2 text-white rounded-xl bg-blue-500 hover:-translate-y-1 duration-150 ease-in"
            title="Edit"
          >
            <SquarePen size={18} />
          </button>
          {/* Delete */}
          <button
            onClick={() => onDelete?.(id)}
            className="cursor-pointer p-2 text-white rounded-xl bg-red-500 hover:-translate-y-1 duration-150 ease-in"
            title="Hapus"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}