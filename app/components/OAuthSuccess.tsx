"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../utils/api";
import { useUserStore } from "../stores/userStore";
import { getUser } from "../utils/user";

export default function OAuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      if (token) {
        try {
          // Simpan token (backend akan menangani cookies)
          await api.post(
            "/api/v1/auth/save-token",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Ambil data pengguna
          const userData = await getUser();
          if (userData) {
            setUser(userData); // Perbarui state global
            router.push("/");
          } else {
            throw new Error("Gagal mengambil data pengguna");
          }
        } catch (error) {
          console.error("OAuth error:", error);
          router.push("/login?error=failed");
        }
      } else {
        router.push("/login?error=no_token");
      }
    };

    handleOAuthSuccess();
  }, [token, router, setUser]);

  return null;
}