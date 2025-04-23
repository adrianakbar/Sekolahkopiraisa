import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

type ProductCardProps = {
  image: string;
  title: string;
  price: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductCard({
  image,
  title,
  price,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow border p-3 flex flex-col justify-between bg-white">
      <div className="relative w-full h-40">
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
          <h2 className="text-sm font-bold text-black leading-snug">
            {title}
          </h2>
          <p className="text-sm font-semibold text-amber-950 mt-1">
            {price}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onEdit}
            className="bg-amber-950 text-white p-2 rounded-md hover:bg-amber-900"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="bg-amber-950 text-white p-2 rounded-md hover:bg-amber-900"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
