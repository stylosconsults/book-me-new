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
    <div className="w-full">
      <Link href={link ?? `/c/${id}?cat=${name}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className="w-full h-[300px] object-cover" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold capitalize">{name}</h1>
          <p className="text-sm text-gray-500 capitalize">
            {size} {name} Listed
          </p>
        </div>
      </Link>
    </div>
  );
}
