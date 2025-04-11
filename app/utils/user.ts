export const getUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user`, {
        credentials: 'include',
        cache: 'no-store',
      });
  
      if (!res.ok) return null;
  
      const data = await res.json();
      return data.data; // karena kamu wrap data dalam { data: { ... } }
    } catch (error) {
      console.error("Gagal fetch user:", error);
      return null;
    }
  };
  