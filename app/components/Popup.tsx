"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, TriangleAlert, X } from "lucide-react";

interface PopupProps {
  message: string;
  onClose: () => void;
  duration?: number; // dalam ms
  type?: "success" | "error";
}

export default function Popup({
  message,
  onClose,
  duration = 3000,
  type = "success", // default success
}: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  const Icon = type === "error" ? <TriangleAlert /> : <CheckCheck />;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }} // muncul dari atas
          animate={{ opacity: 1, y: 0 }} // turun ke posisi tetap
          exit={{ opacity: 0, y: -50 }} // menghilang ke atas lagi
          transition={{ duration: 0.3 }}
          className={`fixed top-6 right-6 z-50 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg text-xl`}
        >
          <div className="flex justify-between items-center gap-2">
            <span>{Icon}</span>
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 font-bold">
            <X  />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
