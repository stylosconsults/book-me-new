import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  name: string;
  size: number;
  image: string;
  id: string;
  link?: string;
}
export default function CategoryCard({
  image,
  name,
  size,
  id,
  link,
}: CategoryCardProps) {
  return (
    <div
      className="w-[400px] h-[250px] bg-cover bg-center relative p-4 rounded-3xl overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-[102%]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Link href={link ?? `/c/${id}?cat=${name}`}>
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-blue-600 bg-opacity-50 text-center text-white transition-transform duration-300 hover:scale-110">
          <h1 className="text-2xl font-bold capitalize">{name}</h1>
          <p className="text-sm text-gray-200 capitalize">
            {size} {name} Listed
          </p>
        </div>
      </Link>
    </div>
  );
}
