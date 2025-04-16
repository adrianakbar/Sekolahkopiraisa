"use client";
import { useEffect, useState } from "react";
import { fetchAllNews } from "../utils/activity";

// Interface for our filtered news items
interface ActivityItemApi {
  id: number;
  title: string;
  content: string;
  image: string;
  time: string;
}

// Format time for relative time display
const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();

  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 60) {
    return `${diffMins}m`;
  } else if (diffHrs < 24) {
    return `${diffHrs}hr`;
  } else if (diffDays < 7) {
    return `${diffDays}d`;
  } else {
    return date.toLocaleDateString();
  }
};

export default function Activity() {
  const [activities, setActivities] = useState<ActivityItemApi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getActivities = async () => {
      try {
        setLoading(true);
        const response = await fetchAllNews();
        const rawData = response.data;
        
        const filtered = rawData
          .map((item: any) => {
            // Ambil media yang tipe-nya image
            const imageMedia = item.newsMedia?.find((media: any) =>
              media.media_type?.startsWith("image/")
            );
            
            if (!imageMedia) return null;
            
            return {
              id: item.id,
              title: item.title,
              content: item.content,
              image: imageMedia.media_url,
              time: formatRelativeTime(item.created_at)
            };
          })
          .filter(Boolean); // buang null
          
        setActivities(filtered);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError("Failed to load activities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    getActivities();
  }, []);

  if (loading) {
    return <div>Loading activities...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
                <p className="text-gray-700 mb-3">{activity.content}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            No activities found
          </div>
        )}
      </div>
    </div>
  );
}