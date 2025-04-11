"use client";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Aulia Putri Rachmawati",
    email: "email@gmail.com",
    phone: "0812345679",
    address:
      "Jl. Kalimantan Tegalboto No.37, Krajan Timur, Sumbersari, Kec. Sumbersari, Kabupaten Jember, Jawa Timur 68121",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optional: reset to initial data from database if needed
  };

  const handleSave = () => {
    // Simpan data ke backend di sini
    setIsEditing(false);
    console.log("Data disimpan:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-center text-2xl font-bold mb-6">Profil Saya</h1>

      <div className="flex flex-col items-center space-y-3 mb-6">
        <img
          src="/path/to/user-image.jpg"
          alt="Foto Profil"
          className="w-40 h-40 rounded-full object-cover border"
        />
        <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-sm rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition">
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
            className={`w-full border rounded-lg p-2 mt-1 ${
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
            className={`w-full border rounded-lg p-2 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block font-medium">No. HP</label>
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg p-2 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block font-medium">Alamat</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-lg p-2 mt-1 resize-none ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Tombol Aksi */}
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
