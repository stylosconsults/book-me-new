"use client";
import Heading from "@/components/atoms/Heading";
import { BlurredDataImage, ImagePlaceholderOnError } from "@/lib/blurredImage";
import { IVehicle } from "@/types/vehicle.schema";
import { getAllVehicles } from "@/utils/vehicle.api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";

export default function VehiclesPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: vehicles, isLoading: isVehiclesLoading } = useQuery({
    queryKey: ["properties", currentPage],
    queryFn: () => getAllVehicles({ limit: 15, page: currentPage }),
  });
  return (
    <div>
      <Heading>All Vehicles</Heading>
      {vehicles?.length <= 0 && (
        <p className="text-sm text-red-500">
          No Vehicles available at the moment
        </p>
      )}
      {vehicles?.map((vehicle: IVehicle, index: number) => (
        <div
          key={index}
          className="bg-white rounded-2xl group mt-5 min-w-[200px]"
          style={{
            width: "calc(25% - 20px)",
            minWidth: "200px",
          }}
        >
          <div className="relative overflow-hidden rounded-t-2xl w-full h-52">
            <Image
              src={vehicle.images[0]}
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
                  {vehicle.model}
                </p>
                <p className="text-xs">{vehicle.type}</p>
              </div>
              <div className="py-1 px-2 h-fit border-2 rounded border-co-green">
                <p className="text-co-green text-[8px] text-center font-bold uppercase">
                  {vehicle.location}
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
          </div>

          <Link href={`/booking/c/${vehicle.id}`}>
            <Button
              disabled={vehicle.dailyPrice === 0}
              className="py-1 font-medium bg-co-blue text-white border-0 w-full mt-2"
            >
              Book now for ${vehicle.dailyPrice} Daily
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
