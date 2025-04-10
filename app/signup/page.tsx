"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginWithGoogle, registerUser } from "../utils/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Popup from "../components/Popup";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for field
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(form);
      setMessage(response.message);
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => {
        router.push("/login"); // redirect setelah popup muncul
      }, 3000);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors); // ✅ Tangkap error backend
      } else {
        {
          setMessage(error.message || "Terjadi kesalahan");
          setPopupType("error");
          setShowPopup(true);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-12">
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="md:col-span-12 lg:col-span-6 flex justify-center items-center bg-background relative p-4 md:p-8 lg:p-10 order-2 md:order-1">
        <div className="absolute -top-10 right-0 -z-0 hidden md:block">
          <Image
            src="/assets/flower-top.png"
            width={300}
            height={300}
            alt="Flower Top"
            className="w-20 sm:w-24 md:w-32 lg:w-auto"
          />
        </div>
        <div className="absolute bottom-0 left-0 -z-0 hidden md:block">
          <Image
            src="/assets/flower-bottom.png"
            width={350}
            height={300}
            alt="Flower Bottom"
            className="w-20 sm:w-24 md:w-32 lg:w-auto"
          />
        </div>

        <div className="relative z-10 max-w-lg w-full px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Welcome</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nama</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-xl"
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full p-2 border border-gray-300 rounded-xl"
                placeholder="Masukkan email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium">Kata Sandi</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded-xl"
                placeholder="Masukkan kata sandi"
              />
              <button
                type="button"
                className="absolute top-8 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">No. HP</label>
              <input
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                type="number"
                className="w-full p-2 border border-gray-300 rounded-xl"
                placeholder="Masukkan nomor hp"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number}
                </p>
              )}
            </div>

            <p className="text-xs text-gray-600">
              Dengan membuat akun, Anda menyetujui{" "}
              <span className="text-brown-700 font-medium">Syarat Layanan</span>{" "}
              dan{" "}
              <span className="text-brown-700 font-medium">
                Kebijakan Privasi
              </span>{" "}
              kami.
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-primary text-white rounded-xl hover:-translate-y-1 duration-150 ease-in"
            >
              Buat Akun
            </button>
          </form>

          <div className="flex items-center my-3 md:my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">Atau</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            type="button"
            className="w-full p-2 bg-gray-300 rounded-xl border-gray-400 border hover:-translate-y-1 duration-150 ease-in flex justify-center items-center gap-2"
            onClick={loginWithGoogle}
          >
            <Image
              src="/assets/google-logo.png"
              alt="Google Icon"
              width={20}
              height={20}
            />
            <span>Login dengan Google</span>
          </button>
          <p className="text-center mt-4 text-gray-700 text-sm">
            Sudah punya akun?
            <Link
              href="/login"
              className="text-blue-500 font-medium hover:underline ml-1"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>

      <div
        className="md:col-span-12 lg:col-span-6 min-h-[30vh] md:min-h-[50vh] lg:min-h-screen flex-shrink-0 order-1 md:order-2"
        style={{
          backgroundImage: "url('/assets/kelompok-capstone.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}
