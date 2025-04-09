"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupProps {
  message: string;
  onClose: () => void;
  duration?: number; // dalam ms
}

export default function Popup({
  message,
  onClose,
  duration = 3000,
}: PopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center gap-2">
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 font-bold">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
