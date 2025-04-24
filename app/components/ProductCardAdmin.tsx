import Image from "next/image";
import { Pencil, SquarePen, Trash, Trash2 } from "lucide-react";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({
  image,
  title,
  price,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gray-300 p-3 flex flex-col justify-between bg-white">
      <div className="relative w-full h-70">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="mt-3 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-sm font-bold text-black leading-snug">{title}</h2>
          <p className="text-sm font-semibold text-amber-950 mt-1">{price}</p>
        </div>
        <div className="flex justify-end md:items-center space-x-2 mt-3 md:mt-0">
          {/* Edit */}
          <button
            onClick={() => onEdit?.()}
            className="cursor-pointer p-2 md:p-3 text-white rounded-xl bg-blue-500 hover:-translate-y-1 duration-150 ease-in"
            title="Edit"
          >
            <SquarePen size={18} />
          </button>
          {/* Delete */}
          <button
            onClick={() => onDelete?.()}
            className="cursor-pointer p-2 md:p-3 text-white rounded-xl bg-red-500 hover:-translate-y-1 duration-150 ease-in"
            title="Hapus"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
