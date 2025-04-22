"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/app/stores/userStore";
import { updateUser } from "@/app/utils/user";
import Popup from "@/app/components/Popup";
import ConfirmModal from "@/app/components/ConfirmModal";


export default function Profile() {
  const user = useUserStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [emailErrorOnEdit, setEmailErrorOnEdit] = useState(false);

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [imageUrl, setImageUrl] = useState("/assets/user.png");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Hapus error untuk field yang sedang diedit
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmailErrorOnEdit(false);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
      });
      setImageUrl(user.image || "/assets/user.png");
      setImageFile(null);
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateUser({
        name: formData.name,
        phone_number: formData.phone_number,
        file: imageFile,
      });

      if (response) {
        setErrors({}); // Reset errors
        setEmailErrorOnEdit(false);
        setIsEditing(false); // Pindah ke sini
        setImageUrl(response.image || imageUrl);
        setImageFile(null);
        setMessage(response.message);
        setPopupType("success");
        setShowPopup(true);
      }
    } catch (error: any) {
      if (error.type === "validation") {
        setErrors(error.errors); // Tampilkan error validasi
        // Jangan setIsEditing(false) di sini, biar user tetap bisa edit
      } else {
        setMessage(error.message || "Terjadi kesalahan saat menyimpan profil.");
        setPopupType("error");
        setShowPopup(true);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
      });
      setImageUrl(user.image || "/assets/user.png");
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 md:py-50">
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      <h1 className="text-center text-2xl font-bold mb-6">Profil Saya</h1>

      <div className="flex flex-col items-center space-y-3 mb-6">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border">
          <Image
            src={imageUrl}
            alt="Foto Profil"
            fill
            className="object-cover"
            priority
          />
        </div>
        <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-sm rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 transition">
          <input
            type="file"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const previewUrl = URL.createObjectURL(file);
                setImageFile(file);
                setImageUrl(previewUrl);

                try {
                  const response = await updateUser({
                    name: formData.name,
                    phone_number: formData.phone_number,
                    file: file,
                  });

                  if (response) {
                    setImageUrl(response.image || previewUrl);
                    setImageFile(null);
                    setMessage("Foto profil berhasil diperbarui!");
                    setPopupType("success");
                    setShowPopup(true);
                  }
                } catch (error: any) {
                  if (error.type === "validation") {
                    setErrors(error.errors); // Tampilkan error validasi
                    // Jangan setIsEditing(false) di sini, biar user tetap bisa edit
                  } else {
                    setMessage(
                      error.message ||
                        "Terjadi kesalahan saat menyimpan profil."
                    );
                    setPopupType("error");
                    setShowPopup(true);
                  }
                }
              }
            }}
          />
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
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={true}
            className={`w-full border rounded-xl p-2 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
          {emailErrorOnEdit && (
            <p className="text-red-500 text-sm mt-1">
              {"*Maaf email tidak bisa diganti"}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">No. HP</label>
          <input
            name="phone_number"
            type="text"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-xl p-2 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
          )}
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setEmailErrorOnEdit(true);
            }}
            className="w-full py-3 bg-[#5c2e0e] text-white rounded-xl font-semibold hover:bg-[#47230b] transition"
          >
            Perbarui Profil
          </button>
        ) : (
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowConfirmModal(true);
              }}
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Simpan
            </button>
            <ConfirmModal
              title="Simpan Perubahan"
              description="Apakah Anda yakin ingin menyimpan perubahan ini?"
              isOpen={showConfirmModal}
              onClose={() => setShowConfirmModal(false)}
              onConfirm={() => {
                setShowConfirmModal(false);
                handleSave();
              }}
            />

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
