"use client";

import ActivityAdminSkeleton from "@/app/components/ActivityAdminSkeleton";
import ActivityCardAdmin, {
  ActivityProps,
} from "@/app/components/ActivityCardAdmin";
import ConfirmModal from "@/app/components/ConfirmModal";
import Popup from "@/app/components/Popup";
import { deleteActivity, fetchAllActivity } from "@/app/utils/activity";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Activity() {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [activityToDelete, setActivityToDelete] = useState<number | null>(null);
  const [activities, setActivities] = useState<ActivityProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleAddActivity = () => {
    router.push("/admin/activity/create");
  };
  
  const handleDeleteActivity = async (id: number) => {
    try {
      const response = await deleteActivity(id);
      if (response) {
        setActivities((prev) => prev.filter((a) => a.id !== id));
        setMessage(response.message);
        setPopupType("success");
        setShowPopup(true);
      }
    } catch (error: any) {
      setMessage(error.message || "Terjadi kesalahan saat menghapus.");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  const handleEditActivity = (id: number) => {
    router.push(`/admin/activity/edit/${id}`);
  };

  const handleViewActivity = (id: number) => {
    router.push(`/admin/activity/detail/${id}`);
  };

  const formatUpload = (dateString: string): string => {
    try {
      const date = new Date(dateString);

      // Format to Indonesian style date: DD Month YYYY
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      return date.toLocaleDateString("id-ID", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return original string if there's an error
    }
  };

  useEffect(() => {
    const getActivities = async () => {
      try {
        setLoading(true);
        const response = await fetchAllActivity();
        const rawData = response.data;

        const filtered = rawData
          .filter((item: any) =>
            item.newsMedia?.some((media: any) =>
              media.media_type?.startsWith("image/")
            )
          )
          .map((item: any) => {
            const imageMedia = item.newsMedia.find((media: any) =>
              media.media_type?.startsWith("image/")
            );

            return {
              id: item.id,
              title: item.title,
              content: item.content,
              image: imageMedia?.media_url || "/placeholder-image.jpg",
              time: formatUpload(item.created_at),
            };
          })
          .filter(Boolean); // buang null

        setActivities(filtered);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, []);

  return (
    <div className="max-w-7xl mx-auto sm:p-3 bg-gray-50 min-h-screen">
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      <ConfirmModal
        title="Hapus Berita"
        description="Apakah Anda yakin ingin menghapus berita ini?"
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setActivityToDelete(null);
        }}
        onConfirm={() => {
          if (activityToDelete !== null) {
            handleDeleteActivity(activityToDelete);
          }
          setShowConfirmModal(false);
          setActivityToDelete(null);
        }}
      />

      <div className="flex justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Daftar Berita</h1>
        <button
          className="bg-amber-950 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-xl flex items-center hover:-translate-y-1 duration-150 ease-in text-sm sm:text-base"
          onClick={handleAddActivity}
        >
          <span className="mr-1 font-bold">+</span> Tambah Berita
        </button>
      </div>

      <div className="flex flex-col space-y-3 sm:space-y-4">
        {loading ? (
          <>
            <ActivityAdminSkeleton />
            <ActivityAdminSkeleton />
            <ActivityAdminSkeleton />
          </>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">Tidak ada berita tersedia</div>
        ) : (
          activities.map((item) => (
            <ActivityCardAdmin
              key={item.id}
              item={item}
              onDelete={(id) => {
                setActivityToDelete(id);
                setShowConfirmModal(true);
              }}
              onEdit={handleEditActivity}
              onView={handleViewActivity}
            />
          ))
        )}
      </div>
    </div>
  );
}