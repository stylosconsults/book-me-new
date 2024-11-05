"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Carousel from "../molecules/Carousel";
import CategoryCard from "../molecules/CategoryCard";
import Heading from "../atoms/Heading";
import Spinner from "../atoms/Spinner";
import { getCategories } from "@/utils/category.api";
import { ICategory } from "@/types/category.schema";

export default function CategoriesList() {
  const { data: propertyCategories, isLoading: isPropertyCategoriesLoading } =
    useQuery({
      queryKey: ["propertyCategories"],
      queryFn: getCategories,
    });
  return (
    <>
      <Heading>Browse by property type</Heading>

      {!isPropertyCategoriesLoading &&
      propertyCategories?.results.length > 0 ? (
        <Carousel itemsToShow={3} slideInterval={5000} >
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
