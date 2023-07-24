import React, { useState } from "react";
import SelectWithError from "../atoms/Select";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "./CategoriesList";
import { ICategory, ICreateHotel } from "@/types/schemas";
import Input from "../atoms/Input";

export default function PropertyForm() {
  const { data: propertyCategories, isLoading: isPropertyCategoriesLoading } =
    useQuery({
      queryKey: ["propertyCategories"],
      queryFn: GetCategories,
    });

  const convertedCategory =
    propertyCategories?.results?.map((cat: ICategory) => ({
      value: cat.id,
      label: cat.name.at(0)?.toLocaleUpperCase() + cat.name.slice(1),
    })) ?? [];

  const [formData, setFormData] = useState<ICreateHotel>();

  const handleChange = (
    name: keyof typeof formData,
    value: string | string[]
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <SelectWithError
        disabled={isPropertyCategoriesLoading}
        label="Select property category"
        options={convertedCategory}
        onChange={(e: any) => {
          handleChange("category", e.value);
        }}
      />
      {<Input label={``} type="text" />}
    </div>
  );
}
