"use client";
import { Eye, SquarePen, Trash } from "lucide-react";
export interface ActivityProps {
  id: number;
  title: string;
  content: string;
  image: string;
  time: string;
}
interface ActivityCardAdminProps {
  item: ActivityProps;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
}
export default function ActivityCardAdmin({
  item,
  onDelete,
  onEdit,
  onView,
}: ActivityCardAdminProps) {
  return (
    <div className="bg-tertiary rounded-xl p-2 sm:p-4 flex flex-col sm:flex-row justify-between shadow-lg">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:mr-4 flex-shrink-0 mb-3 sm:mb-0">
          <img
            src={item.image}
            alt="Activity thumbnail"
            className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-medium text-gray-800">{item.title}</h2>
          <div className="text-sm text-gray-600 mt-1">
            <span>Diunggah</span> • <span>{item.time}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end sm:items-center space-x-2 mt-3 sm:mt-0">
        {/* Edit */}
        <button
          onClick={() => onEdit?.(item.id)}
          className="p-2 sm:p-3 text-white rounded-xl bg-blue-500 hover:-translate-y-1 duration-150 ease-in"
          title="Edit"
        >
          <SquarePen size={18} />
        </button>
        {/* Delete */}
        <button
          onClick={() => onDelete?.(item.id)}
          className="p-2 sm:p-3 text-white rounded-xl bg-red-500 hover:-translate-y-1 duration-150 ease-in"
          title="Hapus"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}