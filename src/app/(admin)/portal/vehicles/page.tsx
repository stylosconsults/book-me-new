"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import { CustomTable } from "@/components/molecules/Table";
import { IVehicle } from "@/types/vehicle.schema";
import { getAllVehicles } from "@/utils/vehicle.api";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

const vehicleColumnHelper = createColumnHelper<IVehicle>();

export default function AllVehicle() {
  const columns = [
    vehicleColumnHelper.accessor("model", {
      id: "model",
      header: () => <span className="text-xs">Car Modal</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    vehicleColumnHelper.accessor("make", {
      id: "make",
      header: () => <span className="text-xs">Make</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    vehicleColumnHelper.accessor("dailyPrice", {
      id: "dailyPrice",
      header: () => <span className="text-xs">Daily Price($)</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    vehicleColumnHelper.accessor("fuelType", {
      id: "fuelType",
      header: () => <span className="text-xs">Fuel Type</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    vehicleColumnHelper.accessor("seats", {
      id: "seats",
      header: () => <span className="text-xs">Number of seats</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    vehicleColumnHelper.accessor("year", {
      id: "year",
      header: () => <span className="text-xs">Year</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
  ];

  const [data, setData] = useState<IVehicle[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { data: vehicles, isLoading: isVehiclesLoading } = useQuery({
    queryKey: ["properties", currentPage],
    queryFn: () => getAllVehicles({ limit: 7, page: currentPage }),
  });

  useEffect(() => {
    if (vehicles?.length) {
      setData(vehicles);
    }
  }, [vehicles]);
  return (
    <div className="px-8 py-4">
      <div className="flex justify-between items-center pb-6">
        <Heading
          subTitle="These are properties available in the system"
          subTitleClassName="font-bold text-sm"
        >
          All Properties
        </Heading>
        <Link href="/portal/vehicles/new">
          <Button>Add new vehicle</Button>
        </Link>
      </div>
      <CustomTable
        totalPages={vehicles?.totalPages}
        currentPage={vehicles?.page}
        handlePageChange={(page) => setCurrentPage(page)}
        table={table}
        isLoading={isVehiclesLoading}
      />
    </div>
  );
}
