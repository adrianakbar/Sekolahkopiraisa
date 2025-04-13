"use client";

import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { getUser } from "../utils/user";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(); // Panggil API atau cookies untuk cek login
        if (user) {
          setUser(user); // Update global store jika user ada
        }
      } catch (err) {
        console.error("User not logged in.");
      }
    };
    fetchUser();
  }, [setUser]);

  return <>{children}</>;
}
