import React, { Fragment } from "react";
import HotelCard from "./HotelCard";
import Spinner from "../atoms/Spinner";

interface ListHotelsProps {
  isHotelsLoading: boolean;
  hotels: any;
}
export default function ListHotels({
  isHotelsLoading,
  hotels = [],
}: ListHotelsProps) {
  return (
    <div className="flex flex-wrap gap-[2px] md:gap-5 items-center md:items-start">
      {!isHotelsLoading ? (
        <>
          {hotels?.map(
            (
              { images, id, name, city, amenities, state, address }: any,
              index: number
            ) => (
              <Fragment key={index}>
                <HotelCard
                  id={id}
                  image={images[0]}
                  name={name}
                  state={state}
                  address={address}
                  city={city}
                  RoomNumbers={amenities.length || 0}
                />
              </Fragment>
            )
          )}
          {!isHotelsLoading && hotels?.length === 0 ? (
            <p className="text-center text-md mt-3 font-bold text-gray-500">
              Hotels will be loaded soon (come back later)
            </p>
          ) : null}
        </>
      ) : (
        <div className="mt-3">
          <Spinner />
        </div>
      )}
    </div>
  );
}
