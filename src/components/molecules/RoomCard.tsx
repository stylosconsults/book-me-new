import React, { ReactNode, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { BlurredDataImage, ImagePlaceholderOnError } from "@/lib/blurredImage";
import Button from "../atoms/Button";

interface RoomCardProps {
  id: string;
  name: string;
  noAdults: number;
  noChildren: number;
  price: number;
  refundable: boolean;
  bedType: string;
  breakfast: boolean;
  roomSize: number;
  hideBtn?: boolean;
  images: string[];
  discountedPrice?: number;
  children?: ReactNode;
}
export default function RoomCard({
  id,
  bedType,
  breakfast,
  name,
  noAdults,
  noChildren,
  price,
  refundable,
  roomSize,
  hideBtn,
  images,
  discountedPrice,
  children,
}: RoomCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div
      className="bg-white h-full rounded-2xl group mt-5 border p-2 shadow"
      style={{
        width: "calc(25% - 10px)",
        minWidth: "200px",
      }}
    >
      <div className="relative flex justify-center">
        <div className="relative overflow-hidden rounded-2xl w-full h-40">
          <Image
            src={images[activeImage]}
            alt=""
            className="w-full h-32 overflow-clip duration-1000 object-cover group-hover:scale-110"
            draggable="false"
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={BlurredDataImage}
            onError={ImagePlaceholderOnError}
          />
        </div>
        <div className="flex gap-1 z-50 absolute bottom-2">
          {images.length > 1 &&
            images?.map((img, i) => (
              <div
                key={i}
                className={`w-6 h-6 ${
                  activeImage === i
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }  rounded-2xl text-xs  flex items-center justify-center border cursor-pointer`}
                onClick={() => setActiveImage(i)}
              >
                {i + 1}
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-between my-2 group">
        <p className="group-hover:text-co-blue text-sm py-2 font-medium duration-200 text-co-black">
          {name}
        </p>
        <div className="py-1 px-2 h-fit border-2 rounded border-co-green">
          {discountedPrice && (
            <p className="line-through text-[#B1B5C]  text-xs text-center font-bold uppercase">
              ${discountedPrice}
            </p>
          )}
          <p className="text-co-green text-xs text-center font-bold uppercase">
            ${price}
          </p>
        </div>
      </div>
      {roomSize > 0 && <p className="text-xs">{roomSize} sqm</p>}
      <p>
        {noAdults > 0 && <span className="text-xs">{noAdults} Adults</span>}
        {noChildren > 0 && (
          <span className="text-xs">, {noChildren} Children </span>
        )}
      </p>
      {bedType && <p className="text-xs">{bedType}</p>}
      <p className="text-gray-400 text-xs">
        {refundable ? <span>Refundable, </span> : <span>Non-refundable, </span>}
        {breakfast ? (
          <span>Breackfast included</span>
        ) : (
          <span>Breackfast not included</span>
        )}
      </p>
      {!hideBtn && (
        <Link href={`/booking/${id}`}>
          <Button
            disabled={price === 0}
            className="py-1 font-medium bg-co-blue text-white border-0 w-full mt-2"
          >
            Book now for ${price}
          </Button>
        </Link>
      )}
      {children}
    </div>
  );
}
