import Image from "next/image";

interface ActivityCardProps {
  id: number;
  image: string;
  title: string;
  time: string;
}

export default function ActivityCard({
  cardItems,
}: {
  cardItems: ActivityCardProps[];
}) {
  return (
    <>
      {cardItems.map((activity) => (
        <div key={activity.id} className="w-full">
          <div className="relative h-40 w-full rounded-xl overflow-hidden mb-2">
            <Image
              src={activity.image}
              alt={activity.title}
              layout="fill"
              className="object-cover rounded-xl transition duration-300 hover:brightness-75"
            />
          </div>
          <h3 className="text-sm font-semibold leading-snug">{activity.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
        </div>
      ))}
    </>
  );
}
