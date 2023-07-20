"use client";
import Heading from "@/components/atoms/Heading";
import ListHotels from "@/components/molecules/ListHotels";
import { BASE_URL } from "@/lib/share";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export async function GetHotelsByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/hotels?category=${category}`);
  const users = await res.json();
  return users;
}

export default function GetHotelsInCategory() {
  const params = useParams();
  const searchQuery = useSearchParams();

  const { data: hotels, isLoading: isHotelsLoading } = useQuery({
    queryKey: ["hotelsCategories", params?.categoryId!],
    queryFn: () => GetHotelsByCategory(params?.categoryId as string),
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
        hotels={hotels?.results}
      />
    </>
  );
}
