"use client";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/share";
import ListHotels from "../molecules/ListHotels";
import Heading from "../atoms/Heading";

export async function GetAllHotels() {
  const res = await fetch(`${BASE_URL}/hotels`);
  const users = await res.json();
  return users;
}

export default function AllHotels() {
  const { data: hotels, isLoading: isHotelsLoading } = useQuery({
    queryKey: ["hotels"],
    queryFn: GetAllHotels,
  });

  return (
    <div className="bg-[#F4F5F6] w-full h-fit rounded-3xl">
      <Heading subTitle="Let's go on an adventure">Go somewhere</Heading>
      <ListHotels isHotelsLoading={isHotelsLoading} hotels={hotels?.results} />
    </div>
  );
}
