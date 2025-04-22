"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import TextEditor from "@/app/components/TextEditor";
import Popup from "@/app/components/Popup";
import { fetchActivityById, updateActivity } from "@/app/utils/activity";
import { X } from "lucide-react";
import ConfirmModal from "@/app/components/ConfirmModal";

export default function EditActivityPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const maxWords = 2200;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchActivityById(id ? Number(id) : 0);
        const data = response.data; // Get the actual data from the response

        setTitle(data.title);
        setContent(data.content);

        // Handle thumbnail and additional images from newsMedia array
        if (data.newsMedia && data.newsMedia.length > 0) {
          // Set first image as thumbnail (or you can determine this differently)
          setThumbnailPreview(data.newsMedia[0].media_url);

          // Set any additional images as image previews (skipping the first one if it's used as thumbnail)
          const additionalImages = data.newsMedia
            .slice(1)
            .map((media: { media_url: any }) => media.media_url);
          setImagePreviews(additionalImages);
        }
      } catch (err) {
        console.error("Failed to fetch activity:", err);
        setError("Gagal memuat data berita.");
      }
    };

    fetchData();
  }, [id]);

  const getWordCount = (html: string) => {
    if (!html) {
      return 0;
    }

    const text = html.replace(/<[^>]+>/g, "").trim();
    return text.split(/\s+/).filter(Boolean).length;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrors({});

    if (getWordCount(content) > maxWords) {
      setError(`Maksimal ${maxWords} kata.`);
      return; 
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("postToFacebook", "false");
      formData.append("postToInstagram", "false");

      // Add new media if they exist
      if (thumbnail) {
        formData.append("media", thumbnail);
      }

      images.forEach((img) => formData.append("media", img));

      const response = await updateActivity(Number(id), formData);

      if (response && response.message) {
        setMessage(response.message);
        setPopupType("success");
        setShowPopup(true);
        setTimeout(() => router.push("/admin/activity"), 1500);
      }
    } catch (error: any) {
      if (error.type === "validation") {
        setErrors(error.errors);
      } else {
        console.error("Error:", error);
        setMessage(
          error.message || "Terjadi kesalahan saat memperbarui berita."
        );
        setPopupType("error");
        setShowPopup(true);
      }
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (images.length + newFiles.length > 4) {
        setError("Maksimal 4 gambar tambahan.");
        return;
      }

      setImages((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow-lg">
      {showConfirmModal && (
              <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={async () => {

                  setShowConfirmModal(false);
                }}
                title="Konfirmasi Update"
                description="Apakah Anda yakin ingin memperbarui berita ini?"
              />
            )}
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      <h1 className="text-xl font-semibold mb-4">Edit Berita</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        {/* Konten Berita */}
        <div className="w-full md:w-2/3">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Konten Berita</label>
            <TextEditor
              content={content || ""}
              setContent={(value: string) => {
                setContent(value);
                setErrors((prev) => ({ ...prev, content: "" }));
              }}
              maxCharacters={maxWords}
            />

            {errors.content && (
              <p className="text-sm text-red-600 mt-1">{errors.content}</p>
            )}
          </div>
        </div>

        {/* Form Tambahan */}
        <div className="w-full md:w-1/3">
          {/* Judul */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold">Judul Berita</label>
            <input
              type="text"
              placeholder="Judul Berita"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: "" }));
              }}
              className="w-full p-3 border border-gray-300 rounded"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold">Sampul Gambar</label>
            <div className="border rounded p-4 bg-gray-50">
              {thumbnailPreview ? (
                <div className="relative mb-3">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-40 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnail(null);
                      setThumbnailPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-dashed border-2 border-gray-300 bg-gray-100 rounded flex items-center justify-center h-40 mb-3">
                  <span className="text-gray-500">Unggah Sampul</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                >
                  Pilih Gambar
                </label>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </div>

              {errors.media && (
                <p className="text-sm text-red-600 mt-1">{errors.media}</p>
              )}
            </div>
          </div>

          {/* Gambar Tambahan */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold">
              Gambar Tambahan (maks 4)
            </label>
            <div className="border rounded p-4 bg-gray-50">
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-lg"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition ${
                    images.length >= 4 ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  Tambah Gambar
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={images.length >= 4}
                />
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {images.length}/4 gambar terpilih
              </p>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-xl hover:-translate-y-1 duration-150 ease-in"
          >
            Update Berita
          </button>
        </div>
      </form>
    </div>
  );
}
