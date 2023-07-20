"use client";
import Heading from "../atoms/Heading";
import ListHotels from "../molecules/ListHotels";
import { BASE_URL } from "@/lib/share";
import { useQuery } from "@tanstack/react-query";

export async function GetPromotedHotels() {
  const res = await fetch(`${BASE_URL}/hotels/promoted`);
  const users = await res.json();
  return users;
}

export default function PopularHotels() {
  const { data: hotels, isLoading: isHotelsLoading } = useQuery({
    queryKey: ["promotedHotels"],
    queryFn: GetPromotedHotels,
  });

  return (
    <div className="bg-[#F4F5F6] w-full h-fit rounded-3xl">
      <Heading subTitle="Find the best hotels." className="mt-10">
        Popular hotels
      </Heading>
      <ListHotels isHotelsLoading={isHotelsLoading} hotels={hotels?.results} />
    </div>
  );
}
