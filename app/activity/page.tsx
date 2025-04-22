"use client";
import { useEffect, useState } from "react";
import ActivitySlider from "../components/ActivitySlider";
import ActivityCard from "../components/ActivityCard";
import Footer from "../components/Footer";
import { fetchAllActivity } from "../utils/activity";
import ActivityUserSkeleton from "../components/ActivityUserSkeleton";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/activity/${id}`);
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
              image: imageMedia.media_url, // Gambar default
              time: formatRelativeTime(item.created_at),
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

  // Map activities for slider (first 5 items)
  const sliderItems = activities.slice(0, 4).map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title,
  }));

  // Map activities for cards (all items)
  const cardItems = activities.map((item) => ({
    id: item.id,
    image: item.image,
    title: item.title,
    time: item.time,
    onClick: () => handleCardClick(item.id),
  }));

  if (loading) {
    return <ActivityUserSkeleton />;
  }

  if (error) {
    return (
      <div className="px-4 md:px-8 py-4 max-w-400 mx-auto">
        <div className="mt-20 text-center text-red-500">
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary">
      <div className="px-4 md:px-8 py-4 max-w-400 mx-auto">
        <section className="mt-20 md:mt-30">
          {sliderItems.length > 0 ? (
            <ActivitySlider sliderItems={sliderItems} />
          ) : (
            <div className="text-center py-8">
              No news available for slider.
            </div>
          )}
        </section>
        <section className="my-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Berita Terbaru
          </h2>
          {cardItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <ActivityCard cardItems={cardItems} />
            </div>
          ) : (
            <div className="text-center py-8">No news available.</div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
