"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../utils/api";
import { useUserStore } from "../stores/userStore";
import { getUser } from "../utils/user";

export default function OAuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const setUser = useUserStore((state) => state.setUser);
  const hasRun = useRef(false); // Cegah useEffect berjalan ulang

  useEffect(() => {
    if (hasRun.current) return; // Hanya jalankan sekali
    hasRun.current = true;

    const handleOAuthSuccess = async () => {
      if (!token) {
        console.error("No token found in URL");
        router.replace("/login?error=no_token");
        return;
      }

      try {
        console.log("Saving token:", token);
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
        console.log("Save token response:", saveTokenResponse.data);

        // Tunggu cookie tersimpan
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Coba ambil data pengguna, dengan retry
        let userData = await getUser();
        if (!userData?.data) {
          console.warn("Retrying getUser...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          userData = await getUser();
        }

        if (userData?.data) {
          console.log("Setting user:", userData.data);
          setUser(userData.data);
          // Tunggu state dirender
          await new Promise((resolve) => setTimeout(resolve, 100));
          router.replace("/"); // Gunakan replace untuk navigasi bersih
        } else {
          throw new Error("Gagal mengambil data pengguna setelah retry");
        }
      } catch (error) {
        console.error("OAuth error:", error);
        router.replace("/login?error=failed");
      }
    };

    handleOAuthSuccess();
  }, [token, router, setUser]);

  return null;
}