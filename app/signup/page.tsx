"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid h-screen grid-cols-12">
      <div className="col-span-6 flex justify-center items-center bg-background relative p-10">
        {/* Gambar Top Right */}
        <div className="absolute top-0 -right-18">
          <Image
            src="/assets/flower-top.png"
            width={400}
            height={400}
            alt="Flower Top"
          />
        </div>

        {/* Gambar Bottom Left */}
        <div className="absolute bottom-0 left-0">
          <Image
            src="/assets/flower-bottom.png"
            width={300}
            height={300}
            alt="Flower Bottom"
          />
        </div>

        {/* Konten Form */}
        <div className="relative z-10 max-w-md w-full">
          <h1 className="text-3xl font-semibold mb-6">Welcome</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nama</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium">Kata Sandi</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                className="absolute top-7 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} size="xl" />
                ) : (
                  <FontAwesomeIcon icon={faEye} size="xl" />
                )}
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium">No. HP</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
              />
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
              className="w-full p-2 bg-primary text-white rounded"
            >
              Buat Akun
            </button>
          </form>
          <p className="text-center mt-4 text-gray-700">
            Sudah punya akun?
            <Link
              href="/login"
              className="text-blue-500 font-medium hover:underline ml-0.5"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>

      <div
        className="col-span-6 flex justify-center items-center z-10"
        style={{
          backgroundImage: "url('/assets/kelompok-capstone.jpeg')",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
