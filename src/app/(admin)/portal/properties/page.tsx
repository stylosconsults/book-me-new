"use client";
import ActionModal from "@/components/atoms/ActionModal";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import { CustomTable } from "@/components/molecules/Table";
import DeleteProperty from "@/components/organisms/DeleteProperty";
import PromoteProperty from "@/components/organisms/PromoteProperty";
import { IHotel } from "@/types/hotel.schema";
import { getAllHotels } from "@/utils/hotel.api";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

const categoryColumnHelper = createColumnHelper<IHotel>();

export default function Properties() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: properties, isLoading: isPropertiesLoading } = useQuery({
    queryKey: ["properties", currentPage],
    queryFn: () => getAllHotels({ limit: 7, page: currentPage }),
  });
  const [data, setData] = useState<IHotel[]>([]);
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
    categoryColumnHelper.accessor("address", {
      id: "Address",
      header: () => <span className="text-xs">Address</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),

    categoryColumnHelper.accessor("state", {
      id: "Dates",
      header: () => <span className="text-xs">Country</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),

    categoryColumnHelper.accessor("city", {
      id: "city",
      header: () => <span className="text-xs">City</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),

    categoryColumnHelper.accessor("phone", {
      id: "phone",
      header: () => <span className="text-xs">Phone</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),

    categoryColumnHelper.accessor("email", {
      id: "email",
      header: () => <span className="text-xs">Email Address</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    categoryColumnHelper.accessor("promoted", {
      id: "promoted",
      header: () => <span className="text-xs">Promoted</span>,
      cell: (info) => (
        <span className="font-medium text-sm">
          {info.getValue() ? (
            <span className="text-green-500">Yes</span>
          ) : (
            <span className="text-red-500">No</span>
          )}
        </span>
      ),
    }),
    categoryColumnHelper.accessor("status", {
      id: "status",
      header: () => <span className="text-xs">Status</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    categoryColumnHelper.accessor("status", {
      id: "actions",
      header: () => <span className="text-xs">Actions</span>,
      cell: (info) => (
        <>
          <ActionModal
            actions={[
              {
                label: (
                  <Link href={`/portal/properties/${info.row.original.id}`}>
                    Rooms
                  </Link>
                ),
              },
              {
                label: (
                  <PromoteProperty
                    name={info.row.original.name}
                    id={info.row.original.id}
                    isPromoted={info.row.original.promoted}
                  />
                ),
              },
              {
                label: (
                  <>
                    <DeleteProperty
                      id={info.row.original.id}
                      name={info.row.original.name}
                    />
                  </>
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
    if (properties?.results) {
      setData(properties?.results);
    }
  }, [properties?.results]);

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between items-center pb-6">
        <Heading
          subTitle="These are properties available in the system"
          subTitleClassName="font-bold text-sm"
        >
          All Properties
        </Heading>
        <Link href="/portal/properties/new">
          <Button>Add Hotel</Button>
        </Link>
      </div>
      <CustomTable
        totalPages={properties?.totalPages}
        currentPage={properties?.page}
        handlePageChange={(page) => setCurrentPage(page)}
        table={table}
        isLoading={isPropertiesLoading}
      />
    </div>
  );
}
