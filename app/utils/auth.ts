// utils/auth.ts
export const loginWithGoogle = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
};

export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/daftar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Gagal daftar");

    return data;
  } catch (error) {
    throw error;
  }
};
