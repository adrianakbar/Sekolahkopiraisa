import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function OAuthSuccess() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      axios.post(
        "https://sekolah-kopi-raisa.up.railway.app/api/v1/auth/save-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        router.push("/"); // atau ke halaman utama setelah login
      })
      .catch(() => {
        router.push("/login?error=failed");
      });
    }
  }, [token]);

  return <p>Autentikasi berhasil, mohon tunggu...</p>;
}