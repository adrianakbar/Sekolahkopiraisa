"use client";

import TextEditor from "@/app/components/TextEditor"; // pastikan ini mendukung justify & bold
import { createActivity } from "@/app/utils/activity";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateNewsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // HTML string dari editor
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const maxWords = 2200;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (fileArray.length + images.length > 4) {
        setError("Maksimal 4 gambar tambahan.");
        return;
      }
      setImages((prev) => [...prev, ...fileArray]);
    }
  };

  const getWordCount = (html: string) => {
    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.split(/\s+/).filter(Boolean).length;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError("Judul harus diisi.");
    if (!content.trim()) return setError("Konten berita harus diisi.");
    if (getWordCount(content) > maxWords)
      return setError(`Maksimal ${maxWords} kata.`);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (thumbnail) formData.append("thumbnail", thumbnail);
      images.forEach((img, i) => formData.append(`image_${i}`, img));

      await createActivity(formData);
      router.push("/admin/news");
    } catch (err: any) {
      console.error("Gagal mengunggah berita:", err);
      setError(err.response?.data?.message || "Gagal mengunggah berita.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl mx-auto p-6 bg-white rounded shadow"
    >
      <h1 className="text-xl font-bold mb-4">Buat Berita Baru</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Judul Berita"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4"
        required
      />

      {/* Thumbnail */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
        />
      </div>

      {/* Tambahan Gambar */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Gambar Tambahan (maks 4)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <p className="text-sm text-gray-500 mt-1">
          {images.length} gambar terpilih.
        </p>
      </div>

      {/* Editor */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Konten Berita</label>
        <TextEditor
          content={content}
          setContent={setContent}
          maxCharacters={maxWords}
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white py-2 px-4 rounded-xl hover:-translate-y-1 duration-150 ease-in"
      >
        Unggah Berita
      </button>
    </form>
  );
}
