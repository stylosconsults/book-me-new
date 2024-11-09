"use client";
import Heading from "@/components/atoms/Heading";
import Spinner from "@/components/atoms/Spinner";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import EmblaCarousel from "@/components/molecules/EmblaCarousel";
import RoomCard from "@/components/molecules/RoomCard";
import Tabs from "@/components/molecules/Tabs";
import LocationGoogleMap from "@/components/organisms/LocationGoogleMap";
import { getAllRoomsWithHotel } from "@/utils/room.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";

export default function HotelInformation() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data: rooms, isLoading: isHotelLoading } = useQuery({
    queryKey: ["roomsInHotel", params?.hotelId!],
    queryFn: () => getAllRoomsWithHotel(params?.hotelId as string),
    enabled: Boolean(params?.hotelId),
  });

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <Breadcrumb
        fullLocation={[
          {
            name: " Hotel",
            link: "/hotel/",
          },
          { name: "Hotel Name", link: "/hotel/[id]" },
        ]}
      />
      {isHotelLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mt-3">
            <EmblaCarousel
              slides={rooms?.hotel.images.length > 0 ? rooms.hotel.images : []}
            />
          </div>
          <div>
            <p className="mb-4 font-semibold text-co-green mt-4">
              Spectacular views of
            </p>
            <Heading>{rooms?.hotel.name}</Heading>
          </div>

          <div className="mt-10">
            <Tabs
              activeTab={activeTab}
              setactiveTab={(index) => setActiveTab(index)}
              tabs={["Overview", "Room", "Amenities", "Policies"]}
            />
          </div>

          <div className="mt-5 w-full">
            {activeTab === 0 && (
              <>
                <h3 className="mb-4 font-semibold text-co-black text-2xl">
                  Description
                </h3>
                <div className="text-co-black w-10/12">
                  <p style={{ whiteSpace: "pre-wrap" }} 
                     className="transition-all duration-300">
                    {rooms?.hotel.description ? (
                      showFullDescription ? (
                        rooms.hotel.description
                      ) : (
                        truncateText(rooms.hotel.description, 300)
                      )
                    ) : (
                      <span>
                        {rooms?.hotel.name} is a hotel in {rooms?.hotel.state}
                      </span>
                    )}
                  </p>
                  {rooms?.hotel.description && rooms.hotel.description.length > 300 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-co-green hover:text-co-green/80 font-medium mt-2 transition-colors"
                    >
                      Show {showFullDescription ? "Less" : "More"}
                    </button>
                  )}
                </div>
              </>
            )}
            {(activeTab === 0 || activeTab === 2) && (
              <>
                <h3 className="my-4 font-semibold text-co-black text-2xl">
                  Amenities overview
                </h3>
                <ul className="flex flex-col max-w-[600px] flex-wrap gap-2">
                  {rooms?.hotel.amenities.map((amenity: any, index: number) => (
                    <li
                      key={index}
                      className="text-co-black flex items-center gap-1 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-default"
                    >
                      <IoMdCheckmark /> {amenity}
                    </li>
                  ))}
                  {rooms?.hotel.amenities.length === 0 && (
                    <li className="flex items-center gap-1 text-red-600">
                      <HiOutlineXMark /> No Amerities listed
                    </li>
                  )}
                </ul>
              </>
            )}
            {(activeTab === 0 || activeTab === 1) && (
              <>
                <h3 className="my-4 font-semibold text-co-black text-2xl">
                  Rooms
                </h3>
                <div className="flex flex-wrap gap-3 w-full">
                  {rooms?.results.map((room: any, index: number) => (
                    <Fragment key={index}>
                      <RoomCard
                        id={room.id}
                        images={room.images}
                        name={room?.name}
                        noAdults={room.adults}
                        noChildren={room.children}
                        roomSize={room?.size}
                        price={room?.price}
                        refundable={false}
                        bedType={room?.bedType}
                        breakfast={true}
                      />
                    </Fragment>
                  ))}
                  {rooms?.results.length === 0 && (
                    <li className="flex items-center gap-1 text-red-600">
                      <HiOutlineXMark /> No Rooms listed
                    </li>
                  )}
                </div>
              </>
            )}
            {activeTab === 3 && (
              <p className="flex items-center gap-1 text-red-600">
                <HiOutlineXMark /> No Policies defined
              </p>
            )}
            {(activeTab === 0 || activeTab === 4) && (
              <div className="rounded-md overflow-hidden hidden">
                <h3 className="my-4 font-semibold text-co-black text-2xl">
                  Hotel Location
                </h3>
                <LocationGoogleMap />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
