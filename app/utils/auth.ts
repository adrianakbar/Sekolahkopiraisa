import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // supaya cookie (seperti token login) dikirim
});

// Google OAuth Login
export const loginWithGoogle = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
};

// Register
export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}) => {
  try {
    const res = await API.post("/api/v1/auth/daftar", formData);
    return res.data;
  } catch (error: any) {
    throw error; // biarkan frontend tangani error.response.data
  }
};

// Login
export const loginUser = async (formData: {
  emailOrPhone: string;
  password: string;
}) => {
  try {
    const res = await API.post("/api/v1/auth/login", formData);
    return res.data;
  } catch (error: any) {
    throw error; // tangani di frontend
  }
};

// Logout
export const logout = async () => {
  try {
    const res = await API.post("/api/v1/auth/logout");
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

// Get User
export const getUser = async () => {
  try {
    const res = await API.get("/api/v1/auth/user", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data.data; // menyesuaikan dengan response backend
  } catch (error) {
    console.error("Gagal fetch user:", error);
    return null;
  }
};
