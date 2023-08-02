"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import { CustomTable } from "@/components/molecules/Table";
import Dialog from "@/components/organisms/dialog";
import { ICategory } from "@/types/schemas";
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
      cell: (info) => <span className="font-medium text-sm">...</span>,
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
        <Button className="h-fit">Add Category</Button>
      </div>
      <CustomTable table={table} isLoading={isPropertyCategoriesLoading} />
    </div>
  );
}

export function ViewImage({ url }: { url: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="text-blue-500 hover:underline"
        onClick={() => setModalOpen(true)}
      >
        View Image
      </button>
      <Dialog open={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="w-full h-full" />
        </div>
      </Dialog>
    </>
  );
}
