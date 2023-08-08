"use client";
import Heading from "@/components/atoms/Heading";
import RoomCard from "@/components/molecules/RoomCard";
import DeleteRoom from "@/components/organisms/DeleteRoom";
import RoomForm from "@/components/organisms/RoomForm";
import { getAllRoomsWithHotel } from "@/utils/room.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import { RiAddCircleLine } from "react-icons/ri";

export default function RoomsOfProperties() {
  const params = useParams();

  const { data: rooms, isLoading: isHotelLoading } = useQuery({
    queryKey: ["roomsInHotel", params?.propertyId!],
    queryFn: () => getAllRoomsWithHotel(params?.propertyId as string),
    enabled: Boolean(params?.propertyId),
  });

  return (
    <div className="px-8 py-4">
      <Heading>
        Rooms in <span className="text-blue-500">{rooms?.hotel.name}</span>
      </Heading>
      {!isHotelLoading ? (
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
                hideBtn
              >
                <div className="flex gap-3">
                  <RoomForm
                    room={{ ...room, hotel: room.hotel.id }}
                    trigger={
                      <div className="py-1 font-medium rounded-lg bg-co-blue text-white border-0 w-full mt-2">
                        Edit
                      </div>
                    }
                  />
                  <DeleteRoom id={room.id} name={room.name} />
                </div>
              </RoomCard>
            </Fragment>
          ))}
          <div className="bg-white rounded-2xl group mt-5 border shadow hover:bg-gray-100">
            <RoomForm
              trigger={
                <div
                  style={{
                    width: "calc(25% - 10px)",
                    minWidth: "200px",
                  }}
                >
                  <div className="flex flex-col items-center justify-center mt-16 mb-16">
                    <RiAddCircleLine size={50} color="gray" />
                    <p className="font-bold">Add room</p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
