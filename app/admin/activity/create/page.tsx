"use client";

import TextEditor from "@/app/components/TextEditor";
import { createNews } from "@/app/utils/activity";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateNewsPage() {
  const [content, setContent] = useState(""); // HTML string dari Quill
  const maxCharacters = 1200;
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return setError("Konten berita harus diisi");

    // Kode untuk submit ke backend, bisa pakai axios seperti biasa
    try {
      const formData = new FormData();
      formData.append("content", content); // HTML dari TipTap
      // Form lainnya, misalnya title dan gambar

      await createNews(formData);
      router.push("/news");
    } catch (err: any) {
      console.error("Gagal mengunggah berita:", err);
      setError(err.response?.data?.message || "Gagal mengunggah berita.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Judul Berita"
          className="w-full p-3 border border-gray-200 rounded-md mb-4"
        />
      </div>

      {/* Editor */}
      <TextEditor
        content={content}
        setContent={setContent}
        maxCharacters={maxCharacters}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Unggah Berita
      </button>
    </form>
  );
}
