"use client";

import { fetchAllNews } from "@/app/utils/activity";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ActivityItem {
  id: number;
  title: string;
  content: string;
  image: string;
  time: string;
}

export default function Activity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleAddNews = () => {
    router.push('/admin/activity/create');
  };


  const formatUpload = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      
      // Format to Indonesian style date: DD Month YYYY
      const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      
      return date.toLocaleDateString('id-ID', options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return original string if there's an error
    }
  };

  useEffect(() => {
    const getActivities = async () => {
      try {
        setLoading(true);
        const response = await fetchAllNews();
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
              image: imageMedia.media_url,
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
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <button className="bg-amber-950 text-white px-4 py-2 rounded flex items-center" onClick={handleAddNews}>
          <span className="mr-1 font-bold text-lg">+</span> Tambah Berita
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">No news available</div>
        ) : (
          activities.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

function ActivityItem({ item }: { item: ActivityItem }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between">
      <div className="flex">
        <div className="mr-4 flex-shrink-0">
          <img
            src={item.image}
            alt="Activity thumbnail"
            className="w-32 h-24 object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-medium text-gray-800">{item.title}</h2>
          <div className="text-sm text-gray-600 mt-1">
            <span>Diunggah</span> • <span>{item.time}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </div>
  );
}