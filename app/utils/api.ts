// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sekolah-kopi-raisa.up.railway.app",
  withCredentials: true, // jika pakai cookie/session
});

export default api;
