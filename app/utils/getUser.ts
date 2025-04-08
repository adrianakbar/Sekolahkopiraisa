// utils/getUser.ts
export const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/User`, {
        credentials: 'include',
        cache: 'no-store', // penting biar nggak cache user login
      });
  
      if (!res.ok) return null;
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Gagal fetch user:", error);
      return null;
    }
  };
  