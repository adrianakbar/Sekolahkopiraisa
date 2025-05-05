  "use client";
  import { useEffect, useState } from "react";
  import { useParams, useRouter } from "next/navigation";
  import { fetchActivityById, fetchAllActivity } from "@/app/utils/activity";
  import NewsContent from "@/app/components/NewsContent";
  import LatestNews from "@/app/components/LatestNews";
  import Footer from "@/app/components/Footer";
import ActivityDetailSkeleton from "@/app/components/ActivityDetailSkeleton";

  export default function ActivityDetail() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [activity, setActivity] = useState<any>(null);
    const [latestNews, setLatestNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!id) return;

      const fetchData = async () => {
        try {
          const res = await fetchActivityById(id ? Number(id) : 0);
          const latestRes = await fetchAllActivity();

          setActivity(res.data);
          setLatestNews(
            latestRes.data.slice(0, 5).map((item: any) => {
              const thumbnail =
                item.newsMedia?.find((media: any) => media.isThumbnail) ||
                item.newsMedia?.[0];
              return {
                id: item.id,
                title: item.title,
                image: thumbnail?.media_url || "",
                created_at: item.created_at,
              };
            })
          );
        } catch (err) {
          console.error("Error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [id]);

    if (loading) return <ActivityDetailSkeleton />;

    return (
      <>
        <div className="bg-secondary pt-20 md:pt-25">
          {" "}
          {/* Background gray and padding */}
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 md:mb-10">
              {/* White card for NewsContent */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <NewsContent activity={activity} />
              </div>
            </div>
            <div>
              {/* White card for LatestNews */}
              <div className="bg-white p-6 rounded-xl shadow-md mb-10">
                <LatestNews items={latestNews} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
