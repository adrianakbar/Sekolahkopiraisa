"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Eye, EyeOff, X } from "lucide-react";
import { loginUser, loginWithGoogle } from "../utils/auth";
import { useRouter } from "next/navigation";
import Popup from "../components/Popup";

export default function Login() {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
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
      const response = await loginUser(form);
      router.push("/"); // redirect setelah popup muncul
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors); // ✅ Tangkap error backend
      } else {
        setMessage(error.message || "Terjadi kesalahan");
        setPopupType("error");
        setShowPopup(true);
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
        {/* Background decoration */}
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
            width={300}
            height={300}
            alt="Flower Bottom"
            className="w-20 sm:w-24 md:w-32 lg:w-auto"
          />
        </div>

        <div className="relative z-10 max-w-lg w-full px-4 py-8 md:py-12">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black transition-all inline-flex items-center"
          >
            <ChevronLeft /> Kembali ke Homepage
          </Link>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Welcome</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Email/Nomer Hp
              </label>
              <input
                name="emailOrPhone"
                value={form.emailOrPhone}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-xl"
                placeholder="Masukkan email atau nomor hp"
              />
              {errors.emailOrPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrPhone}
                </p>
              )}
            </div>
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">Kata Sandi</label>
                <Link
                  href="/forgot-password"
                  className="text-xs md:text-sm text-blue-500 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>
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
                className="absolute top-9 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-primary text-white rounded-xl mt-4 hover:-translate-y-1 duration-150 ease-in"
            >
              Masuk
            </button>
          </form>

          <div className="flex items-center my-4">
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
            <span>Login with Google</span>
          </button>

          <p className="text-center mt-4 text-gray-700 text-sm">
            Belum punya akun?
            <Link
              href="/signup"
              className="text-blue-500 font-medium hover:underline ml-1"
            >
              Daftar
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
