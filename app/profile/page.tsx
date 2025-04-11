"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { getUser } from "../utils/user";
import { useUserStore } from "../stores/userStore";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    image: "",
  });
  const user = useUserStore((state) => state.user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optional: reset to initial data from database if needed
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Data disimpan:", formData);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        image: user.image,
      });
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-center text-2xl font-bold mb-6">Profil Saya</h1>

      <div className="flex flex-col items-center space-y-3 mb-6">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border">
          <Image
            src={formData.image} // ganti dengan path gambar valid
            alt="Foto Profil"
            fill
            className="object-cover"
          />
        </div>
        <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-sm rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 transition">
          <input type="file" className="hidden" />
          📸 Ubah Foto
        </label>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block font-medium">Nama</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-xl p-2 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-xl p-2 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block font-medium">No. HP</label>
          <input
            name="phone"
            type="text"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-xl p-2 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full py-3 bg-[#5c2e0e] text-white rounded-xl font-semibold hover:bg-[#47230b] transition"
          >
            Perbarui Profil
          </button>
        ) : (
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 bg-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-400 transition"
            >
              Batal
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
