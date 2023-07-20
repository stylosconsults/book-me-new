import React from "react";

import Image from "next/image";
import Link from "next/link";
import { BlurredDataImage, ImagePlaceholderOnError } from "@/lib/blurredImage";

interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  image: string;
  width?: string;
  RoomNumbers: number;
}

export default function HotelCard({
  id,
  address,
  name,
  state,
  city,
  image,
  RoomNumbers,
  width = "calc(25% - 20px)",
}: HotelCardProps) {
  return (
    <div
      className="bg-white rounded-2xl group mt-5 min-w-[200px]"
      style={{
        width: width,
        minWidth: "200px",
      }}
    >
      <Link href={`/hotel/${id}`}>
        <div className="relative overflow-hidden rounded-t-2xl w-full h-52">
          <Image
            src={image}
            alt=""
            className="w-full overflow-clip duration-1000 object-cover group-hover:scale-110"
            draggable="false"
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={BlurredDataImage}
            onError={ImagePlaceholderOnError}
          />
        </div>
        <div className="px-5 pb-5">
          <div className="flex justify-between py-3">
            <div className="">
              <p className="hover:text-[#3B71FE] text-sm font-medium duration-200 text-co-black">
                {name}
              </p>
              <p className="text-xs">{city}</p>
            </div>
            <div className="py-1 px-2 h-fit border-2 rounded border-co-green">
              <p className="text-co-green text-[8px] text-center font-bold uppercase">
                {state}
              </p>
            </div>
            {/* <div className='py-1 px-2 h-fit border-2 rounded border-co-green'>
              {discountPrice && (
                <p className='line-through text-[#B1B5C]  text-xs text-center font-bold uppercase'>
                  ${discountPrice}
                </p>
              )}
              <p className='text-co-green text-xs text-center font-bold uppercase'>
                ${price}
              </p>
            </div> */}
          </div>
          <div className="w-full h-[1px] bg-co-gray"></div>
          <div className="flex justify-between py-3">
            <p className="text-[#777E90] text-xs">{address}</p>
            {/* {RoomNumbers > 0 && (
              <div className='flex items-center'>
                <MdOutlineLocalHotel className='text-[#FFC107] text-xs' />
                <p className='text-[#777E90] text-xs ml-1'> {RoomNumbers}</p>
              </div>
            )} */}
          </div>
        </div>
      </Link>
    </div>
  );
}
