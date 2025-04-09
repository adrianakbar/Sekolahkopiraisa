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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/daftar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    // ⛳️ Lempar error mirip struktur axios
    const error = {
      response: {
        data, // berisi message + errors (dari backend)
      },
    };
    throw error;
  }

  return data;
};

