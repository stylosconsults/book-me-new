"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Carousel from "../molecules/Carousel";
import CategoryCard from "../molecules/CategoryCard";
import { BASE_URL } from "@/lib/share";
import Heading from "../atoms/Heading";
import Spinner from "../atoms/Spinner";
import { ICategory } from "@/types/schemas";

async function GetCategories() {
  const res = await fetch(`${BASE_URL}/categories?status=ACTIVE`);
  const users = await res.json();
  return users;
}

export default function CategoriesList() {
  const { data: propertyCategories, isLoading: isPropertyCategoriesLoading } =
    useQuery({
      queryKey: ["propertyCategories"],
      queryFn: GetCategories,
    });
  return (
    <>
      <Heading>Browse by property type</Heading>

      {!isPropertyCategoriesLoading &&
      propertyCategories?.results.length > 0 ? (
        <Carousel itemsToShow={3} slideInterval={5000}>
          {propertyCategories?.results.map(
            (category: ICategory, key: number) => (
              <CategoryCard
                key={key}
                image={category.image}
                id={category.id}
                name={category.name}
                size={category.hotelsCount}
              />
            )
          )}
        </Carousel>
      ) : (
        !isPropertyCategoriesLoading && <>No Categories found</>
      )}
      {isPropertyCategoriesLoading && <Spinner />}
    </>
  );
}
