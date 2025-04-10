import Image from "next/image";

interface MemberCardProps {
  id: number;
  image: string;
  name: string;
  position: string;
}

export default function MemberCard({
  id,
  image,
  name,
  position,
}: MemberCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <div
        className="relative aspect-[4/3] w-full max-w-sm mx-auto overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-300"
        key={id}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-gray-300">{position}</p>
        </div>
      </div>
    </div>
  );
}
