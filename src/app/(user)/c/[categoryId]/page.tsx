"use client";
import Heading from "@/components/atoms/Heading";
import ListHotels from "@/components/molecules/ListHotels";
import { BASE_URL } from "@/lib/share";
import { IHotel } from "@/types/hotel.schema";
import { getHotelsByCategory } from "@/utils/hotel.api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function GetHotelsInCategory() {
  const params = useParams();
  const searchQuery = useSearchParams();

  const { data: hotels, isLoading: isHotelsLoading } = useQuery({
    queryKey: ["hotelsCategories", params?.categoryId!],
    queryFn: () => getHotelsByCategory(params?.categoryId as string),
    enabled: Boolean(params?.categoryId),
  });

  const category = searchQuery.get("cat");

  return (
    <>
      <Heading className="capitalize">
        {searchQuery.get("cat") ?? "Hotels"}
      </Heading>
      <ListHotels
        notFoundMessage={`No properties in ${category} category`}
        isHotelsLoading={isHotelsLoading}
        hotels={hotels?.results?.filter(
          (h: IHotel) => h.category === params?.categoryId
        )}
      />
    </>
  );
}
