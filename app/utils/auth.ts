// utils/auth.ts
export const loginWithGoogle = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
};
