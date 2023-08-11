"use client";
import ActionModal from "@/components/atoms/ActionModal";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import { CustomTable } from "@/components/molecules/Table";
import { ViewImage } from "@/components/molecules/ViewImage";
import CategoryForm from "@/components/organisms/categoryForm";
import Dialog from "@/components/organisms/dialog";
import { ICategory } from "@/types/category.schema";
import { getCategories } from "@/utils/category.api";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const categoryColumnHelper = createColumnHelper<ICategory>();

export default function PropertyCategories() {
  const { data: propertyCategories, isLoading: isPropertyCategoriesLoading } =
    useQuery({
      queryKey: ["propertyCategories"],
      queryFn: getCategories,
    });
  const [data, setData] = useState<ICategory[]>([]);
  const columns = [
    categoryColumnHelper.accessor("name", {
      id: "name",
      header: () => <span className="text-xs">Title</span>,
      cell: (info) => (
        <span className="font-medium text-sm capitalize">
          {info.getValue()}
        </span>
      ),
    }),
    categoryColumnHelper.accessor("hotelsCount", {
      id: "hotelsCount",
      header: () => <span className="text-xs">Properties</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    categoryColumnHelper.accessor("status", {
      id: "status",
      header: () => <span className="text-xs">Status</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    categoryColumnHelper.accessor("image", {
      id: "image",
      header: () => <span className="text-xs">Image</span>,
      cell: (info) => (
        <span className="font-medium text-sm">
          <ViewImage url={info.getValue()} />
        </span>
      ),
    }),

    categoryColumnHelper.accessor("status", {
      id: "status",
      header: () => <span className="text-xs">Actions</span>,
      cell: (info) => (
        <>
          <ActionModal
            actions={[
              {
                label: (
                  <CategoryForm
                    trigger={<p>Edit</p>}
                    formData={info.row.original}
                  />
                ),
              },
            ]}
          />
        </>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (propertyCategories?.results) {
      setData(propertyCategories?.results);
    }
  }, [propertyCategories?.results]);

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between items-center pb-6">
        <Heading
          subTitle="These are categories of properties that are registered."
          subTitleClassName="font-bold text-sm"
        >
          Registered Categories
        </Heading>
        <div>
          <CategoryForm
            trigger={
              <p className="h-fit w-fit px-4 py-2  bg-blue-500 rounded-full text-white font-bold border-co-primary">
                Add Category
              </p>
            }
          />
        </div>
      </div>
      <CustomTable
        totalPages={propertyCategories?.totalPages}
        table={table}
        isLoading={isPropertyCategoriesLoading}
      />
    </div>
  );
}
