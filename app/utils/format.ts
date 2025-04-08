// utils/format.ts
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", { dateStyle: "long" });
