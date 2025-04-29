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

  const [oldImages, setOldImages] = useState<string[]>([]); 
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]); 

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
        const data = response.data;

        setTitle(data.title);
        setContent(data.content);

        if (data.newsMedia && data.newsMedia.length > 0) {
          const thumbnailMedia = data.newsMedia.find(
            (media: { isThumbnail: boolean }) => media.isThumbnail
          );

          setThumbnailPreview(thumbnailMedia?.media_url || null);

          const additionalImages = data.newsMedia
            .filter((media: { isThumbnail: boolean }) => !media.isThumbnail)
            .map((media: { media_url: string }) => media.media_url);

          setImagePreviews(additionalImages);
          setOldImages(additionalImages);
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

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Add new images
      images.forEach((img) => {
        formData.append("media", img);
      });

      // Add retained media as JSON string
      if (oldImages.length > 0) {
        formData.append("retainedMedia", JSON.stringify(oldImages));
      }

      // Log form data for debugging
      console.log("Submitting form data:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      const response = await updateActivity(Number(id), formData);

      if (response && response.message) {
        setMessage(response.message);
        setPopupType("success");
        setShowPopup(true);
        setTimeout(() => router.push("/admin/activity"), 1500);
      }
    } catch (error: any) {
      console.error("Update error:", error);
      
      if (error.errors) {
        setErrors(error.errors);
      } else {
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
    const preview = imagePreviews[index];
    
    // Check if this is an old image or a new one
    const isOldImage = index < oldImages.length;
    
    if (isOldImage) {
      // This is an old image from the server
      setOldImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // This is a new image the user uploaded
      // Adjust index for the new images array
      const newImageIndex = index - oldImages.length;
      setImages((prev) => prev.filter((_, i) => i !== newImageIndex));
    }
    
    // Remove from previews
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
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
      <h1 className="text-lg font-medium mb-4">Edit Berita</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        {/* Konten Berita */}
        <div className="w-full md:w-2/3">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Konten Berita
            </label>
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
            <label className="block mb-1 font-medium text-sm">
              Judul Berita
            </label>
            <input
              type="text"
              placeholder="Judul Berita"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: "" }));
              }}
              className="w-full p-2 border border-gray-300 rounded-xl"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="mb-6">
            <label className="block mb-1 font-medium text-sm">
              Sampul Gambar
            </label>
            <div className="border rounded-xl p-4 bg-gray-50">
              {thumbnailPreview ? (
                <div className="relative mb-3">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div className="border-dashed border-2 border-gray-300 bg-gray-100 rounded-xl flex items-center justify-center h-40 mb-3">
                  <span className="text-gray-500">Unggah Sampul</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer font-medium bg-primary text-white px-3 py-1.5 rounded-xl hover:-translate-y-1 duration-150 ease-in text-sm"
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

              {errors.thumbnail && (
                <p className="text-sm text-red-600 mt-1">{errors.thumbnail}</p>
              )}
            </div>
          </div>

          {/* Gambar Tambahan */}
          <div className="mb-6">
            <label className="block mb-1">Gambar Tambahan (maks 4)</label>
            <div className="border rounded-xl p-4 bg-gray-50">
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-primary text-white rounded-full p-1 shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer bg-primary font-medium text-white text-sm px-3 py-1.5 rounded-xl hover:-translate-y-1 duration-150 ease-in ${
                    imagePreviews.length >= 4 ? "opacity-50 pointer-events-none" : ""
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
                  disabled={imagePreviews.length >= 4}
                />
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {imagePreviews.length}/4 gambar terpilih
              </p>
              {errors.media && (
                <p className="text-sm text-red-600 mt-1">{errors.media}</p>
              )}
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-primary text-white py-2 px-3 text-sm font-medium rounded-xl hover:-translate-y-1 duration-150 ease-in"
          >
            Update Berita
          </button>
        </div>
      </form>
    </div>
  );
}