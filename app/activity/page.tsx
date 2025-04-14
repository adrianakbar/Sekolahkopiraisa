"use client";
import { useEffect, useState } from "react";
import ActivitySlider from "../components/ActivitySlider";
import ActivityCard from "../components/ActivityCard";
import Footer from "../components/Footer";
import { fetchAllNews } from "../utils/activity";

// Define types based on the provided JSON structure
interface NewsMedia {
  id: number;
  news_id: number;
  media_url: string;
  media_type: string;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  newsMedia: NewsMedia[];
}

// Format time for relative time display
const formatRelativeTime = (dateString: string) => {
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

// Get the first image media URL from a news item
const getFirstImageUrl = (newsItem: NewsItem): string => {
  if (!newsItem.newsMedia || newsItem.newsMedia.length === 0) {
    return "/assets/user.png";
  }

  // Filter for image media types only
  const imageMedia = newsItem.newsMedia.filter((media) =>
    media.media_type.startsWith("image/")
  );

  return imageMedia.length > 0
    ? imageMedia[0].media_url
    : "/assets/user.png";
};

export default function Activity() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const response = await fetchAllNews();

        // Extract the data array from the response
        let newsData: NewsItem[] = [];
        if (response && response.data && Array.isArray(response.data)) {
          newsData = response.data;
        } else if (Array.isArray(response)) {
          newsData = response;
        }

        // Filter for published news only
        const publishedNews = newsData.filter((item) => item.published);

        setNews(publishedNews);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  // Map news data to the format expected by ActivitySlider
  const sliderItems = news.slice(0, 5).map((item) => ({
    id: item.id,
    image: getFirstImageUrl(item),
    title: item.title,
  }));

  // Map news data to the format expected by ActivityCard
  const cardItems = news.map((item) => ({
    id: item.id,
    image: getFirstImageUrl(item),
    title: item.title,
    time: formatRelativeTime(item.created_at),
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
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
    <>
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
        <section className="mt-8">
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
    </>
  );
}
