import Image from "next/image";

interface ActivityProps {
  image: string;
  title: string;
}

export default function ActivityCard({ image, title }: ActivityProps) {
  return (
    <div className="relative w-100 h-100 rounded-md overflow-hidden shadow-md">
      {/* Gambar */}
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className=""
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="">{title}</p>
      </div>
    </div>
  );
}
