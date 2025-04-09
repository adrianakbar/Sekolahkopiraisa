import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type PopupProps = {
  message: string;
  onClose: () => void;
};

export default function Popup({ message, onClose }: PopupProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md"
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-semibold mb-2 text-center">Berhasil!</h2>
          <p className="text-center text-gray-700">{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
