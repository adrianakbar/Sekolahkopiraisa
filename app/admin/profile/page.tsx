"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/app/stores/userStore";
import { updateUser } from "@/app/utils/user";
import Popup from "@/app/components/Popup";
import ConfirmModal from "@/app/components/ConfirmModal";
import { facebookLogin } from "@/app/utils/auth";

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
  const [fbProfilePic, setFbProfilePic] = useState<string | null>(null);
  const [igProfilePic, setIgProfilePic] = useState<string | null>(null);
  const [isFbLoggedIn, setIsFbLoggedIn] = useState(false);
  const [isIgLoggedIn, setIsIgLoggedIn] = useState(false);
  const [fbLinked, setFbLinked] = useState(false);
  const [igUsername, setIgUsername] = useState("");

  const handleFacebookLogin = async () => {
    // First check if FB SDK is loaded
    if (typeof window === "undefined" || !(window as any).FB) {
      console.error("Facebook SDK not loaded yet");
      setMessage("Facebook SDK belum tersedia. Silakan muat ulang halaman.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    try {
      const FB = (window as any).FB;

      console.log("Memulai proses login Facebook...");

      FB.login(
        (response: any) => {
          console.log("FB login response:", response);

          if (response && response.authResponse) {
            const { accessToken } = response.authResponse;

            if (!accessToken) {
              console.error("Access token tidak diterima");
              setMessage("Tidak bisa mendapatkan token akses dari Facebook.");
              setPopupType("error");
              setShowPopup(true);
              return;
            }

            console.log("Token diterima, mengirim ke backend...");

            // Call your API endpoint with the token
            facebookLogin(accessToken)
              .then((data) => {
                console.log("✅ Facebook berhasil ditautkan:", data);

                // Set states based on the response from the backend
                setFbLinked(true);
                setIsFbLoggedIn(true);

                // If the backend returns profile image, use it
                if (data.data && data.data.image) {
                  setFbProfilePic(data.data.image);
                }

                // If the backend returns Instagram data, update state
                if (data.data && data.data.instagram_username) {
                  setIgUsername(data.data.instagram_username);
                } else if (
                  data.data &&
                  data.data.instagram &&
                  data.data.instagram.instagram_username
                ) {
                  setIgUsername(data.data.instagram.instagram_username);
                }

                setMessage(data.message || "Akun Facebook berhasil ditautkan!");
                setPopupType("success");
                setShowPopup(true);
              })
              .catch((err) => {
                console.error("❌ Gagal menautkan Facebook:", err);
                setMessage(
                  err.message ||
                    "Gagal menautkan akun Facebook. Silakan coba lagi."
                );
                setPopupType("error");
                setShowPopup(true);
              });
          } else {
            console.log("User membatalkan login atau tidak memberikan izin.");
            setMessage(
              "Anda membatalkan proses tautkan Facebook atau izin tidak diberikan."
            );
            setPopupType("error");
            setShowPopup(true);
          }
        },
        {
          scope:
            "public_profile,email,pages_show_list,instagram_basic,pages_read_engagement",
          return_scopes: true,
        }
      );
    } catch (error: any) {
      console.error("Error in Facebook login process:", error);
      setMessage(
        "Terjadi kesalahan saat menghubungkan ke Facebook: " +
          (error.message || "Kesalahan tidak diketahui")
      );
      setPopupType("error");
      setShowPopup(true);
    }
  };

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
    if (typeof window !== "undefined" && (window as any).FB) {
      const FB = (window as any).FB;

      FB.getLoginStatus((response: any) => {
        if (response.status === "connected") {
          setIsFbLoggedIn(true);
          setFbLinked(true); // ini yang penting
        } else {
          setIsFbLoggedIn(false);
          setFbLinked(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Load FB SDK
    if (typeof window !== "undefined" && !(window as any).FB) {
      window.fbAsyncInit = function () {
        const FB = (window as any).FB;

        console.log("Initializing Facebook SDK...");
        FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
          cookie: true,
          xfbml: true,
          version: "v19.0",
        });

        console.log("Checking Facebook login status...");
        FB.getLoginStatus((response: any) => {
          console.log("Facebook login status:", response.status);
          if (response.status === "connected") {
            setIsFbLoggedIn(true);
            setFbLinked(true);

            FB.api("/me/picture?type=normal", (pic: any) => {
              if (pic && !pic.error && pic.data) {
                setFbProfilePic(pic.data.url);
              }
            });
          }
        });
      };

      // Create and append script
      console.log("Loading Facebook SDK script...");
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.onload = () =>
        console.log("Facebook SDK script loaded successfully");
      script.onerror = (e) =>
        console.error("Failed to load Facebook SDK script", e);
      document.body.appendChild(script);
    }
  }, []);

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
    <div className="max-w-2xl mx-auto px-4 py-20">
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      <h1 className="text-center text-lg font-medium mb-6">Profil Saya</h1>

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

      <form className="space-y-4 text-sm">
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

        <div className="flex items-center justify-center space-x-4 mb-4">
          {fbLinked ? (
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/facebook-logo.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
              <span className="text-sm text-green-600">Sudah Terhubung</span>
            </div>
          ) : (
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:-translate-y-1 duration-150 ease-in"
              onClick={handleFacebookLogin}
            >
              <Image
                src="/assets/facebook-logo.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
              Tautkan Facebook
            </button>
          )}

          {igUsername && (
            <div className="flex items-center space-x-2">
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
              <span className="text-sm text-pink-600">@{igUsername}</span>
            </div>
          )}
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setEmailErrorOnEdit(true);
            }}
            className="w-full py-2 bg-primary text-white rounded-xl font-medium hover:-translate-y-1 duration-150 ease-in"
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
              className="w-full py-2 bg-green-600 text-white rounded-xl font-medium hover:-translate-y-1 duration-150 ease-in"
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
              className="w-full py-2 bg-gray-300 text-gray-800 rounded-xl font-medium hover:-translate-y-1 duration-150 ease-in"
            >
              Batal
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
