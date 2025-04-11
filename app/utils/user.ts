import { API } from "./auth";

// Get User
export const getUser = async () => {
  try {
    const res = await API.get("/api/v1/auth/user", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.error("Gagal fetch user:", error);
    return null;
  }
};