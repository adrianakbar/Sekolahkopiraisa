"use client";

import { X } from "lucide-react";
import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
    title,
    description,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-xl relative mx-4">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-[#A99F99] hover:text-gray-800"
        >
          <X />
        </button>

        {/* Judul */}
        <h2 className="text-xl md:text-2xl font-bold text-center mb-3">
          {title}
        </h2>

        {/* Deskripsi */}
        <p className="text-center text-[#3B3B3B] mb-6">
            {description}
        </p>

        {/* Tombol aksi */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-[#4D2C1D] hover:bg-[#3e2317] text-white font-medium py-2 px-6 rounded-xl"
          >
            Iya
          </button>
          <button
            onClick={onClose}
            className="border border-[#4D2C1D] text-[#4D2C1D] font-medium py-2 px-6 rounded-xl hover:bg-[#f1ebe7]"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
