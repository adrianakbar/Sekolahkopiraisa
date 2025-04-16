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
  duration = 10000,
  type = "success",
}: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  const Icon = type === "error" ? <TriangleAlert size={20} /> : <CheckCheck size={20} />;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-50 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg 
            max-w-[90vw] md:max-w-fit w-full 
            top-6 left-1/2 -translate-x-1/2 
            sm:top-6 sm:right-6 sm:left-auto sm:translate-x-0`}
        >
          <div className="flex items-center gap-3">
            <span>{Icon}</span>
            <span className="flex-1 text-sm sm:text-base break-words">
              {message}
            </span>
            <button onClick={onClose} className="ml-2">
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}