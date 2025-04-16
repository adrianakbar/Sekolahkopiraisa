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
    if (error.response) {
      const { data } = error.response;

      // Validasi field (errors berbentuk object)
      if (data.errors && typeof data.errors === "object") {
        throw {
          type: "validation",
          message: data.message || "Validasi gagal!",
          errors: data.errors,
        };
      }

      // Error umum (errors berbentuk string)
      if (data.errors && typeof data.errors === "string") {
        throw {
          type: "general",
          message: data.errors,
        };
      }

      // Error fallback
      throw {
        type: "general",
        message: data.message || "Terjadi kesalahan!",
      };
    }

    // Error koneksi/server down
    throw {
      type: "network",
      message: "Tidak dapat terhubung ke server. Coba lagi nanti.",
    };
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
    if (error.response) {
      const { data } = error.response;

      // Validasi field (errors berbentuk object)
      if (data.errors && typeof data.errors === "object") {
        throw {
          type: "validation",
          message: data.message || "Validasi gagal!",
          errors: data.errors,
        };
      }

      // Error umum (errors berbentuk string)
      if (data.errors && typeof data.errors === "string") {
        throw {
          type: "general",
          message: data.errors,
        };
      }

      // Error fallback
      throw {
        type: "general",
        message: data.message || "Terjadi kesalahan!",
      };
    }

    // Error koneksi/server down
    throw {
      type: "network",
      message: "Tidak dapat terhubung ke server. Coba lagi nanti.",
    };
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

// Reset Password Request
export const resetPasswordRequest = async (email: string) => {
  try {
    const res = await api.post("/api/v1/auth/reset-password-request", {
      email,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // Gunakan error.response.data.error jika ada, jika tidak gunakan message
      throw new Error(error.response.data.error || error.response.data.message);
    }
    throw new Error("Tidak dapat terhubung ke server. Coba lagi nanti.");
  }
};

// Reset Password
export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  try {
    const res = await api.put("/api/v1/auth/reset-password", {
      token,
      newPassword,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || error.response.data.message);
    }
    throw new Error("Tidak dapat terhubung ke server. Coba lagi nanti.");
  }
};

