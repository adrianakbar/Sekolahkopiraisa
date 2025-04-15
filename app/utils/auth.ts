import api from "./api";

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
    const res = await api.post("/api/v1/auth/daftar", formData);
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
    const res = await api.post("/api/v1/auth/login", formData);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    const res = await api.post("/api/v1/auth/logout");
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

// Reset Password
export const resetPasswordRequest = async (email: string) => {
  try {
    const res = await api.post("/api/v1/auth/reset-password-request", {
      email,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // Gunakan error.response.data.error jika ada, jika tidak gunakan message
      throw new Error(
        error.response.data.error ||
          error.response.data.message
      );
    }
    throw new Error("Tidak dapat terhubung ke server. Coba lagi nanti.");
  }
};
