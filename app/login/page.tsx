"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
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
              <label className="block text-sm font-medium">
                Email/Nomer Hp
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Masukkan email atau nomor hp"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium">Kata Sandi</label>

              {/* Lupa Password */}
              <Link
                href="/forgot-password"
                className="absolute right-0 -top-1 text-sm text-blue-500 hover:underline"
              >
                Lupa Password?
              </Link>

              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Masukkan kata sandi"
              />
              <button
                type="button"
                className="absolute top-7 right-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff />
                ) : (
                  <Eye/>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-primary text-white rounded-md mt-4 hover:-translate-y-1 duration-150 ease-in"
            >
              Masuk
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">Atau</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            type="button"
            className="w-full p-2 bg-gray-300 text-white place-items-center rounded-md border-gray-400 border hover:-translate-y-1 duration-150 ease-in"
            // hover:bg-gray-400 duration-150 ease-in
          >
            <svg
              width="20px"
              height="20px"
              viewBox="-0.5 0 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  {" "}
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    {" "}
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      {" "}
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>

          <p className="text-center mt-4 text-gray-700">
            Belum punya akun?
            <Link
              href="/signup"
              className="text-blue-500 font-medium hover:underline ml-0.5"
            >
              Daftar
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
