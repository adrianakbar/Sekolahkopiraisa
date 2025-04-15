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
      if (!token) {
        console.error("No token found in URL");
        router.push("/login?error=no_token");
        return;
      }

      try {
        console.log("Saving token:", token); // Debugging
        // Simpan token ke cookie
        const saveTokenResponse = await api.post(
          "/api/v1/auth/save-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Save token response:", saveTokenResponse.data); // Debugging

        // Tunggu sebentar untuk memastikan cookie tersimpan
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Ambil data pengguna
        const userData = await getUser();
        console.log("User data:", userData); // Debugging

        if (userData?.data) {
          setUser(userData.data);
          // Tunggu state diperbarui
          await new Promise((resolve) => setTimeout(resolve, 100));
          router.replace("/"); // Gunakan replace untuk menghindari history
        } else {
          throw new Error("Gagal mengambil data pengguna");
        }
      } catch (error) {
        console.error("OAuth error:", error);
        router.push("/login?error=failed");
      }
    };

    handleOAuthSuccess();
  }, [token, router, setUser]);

  return null;
}