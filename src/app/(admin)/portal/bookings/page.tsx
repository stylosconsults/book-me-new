"use client";
import Heading from "@/components/atoms/Heading";
import { CustomTable } from "@/components/molecules/Table";
import { IBooking } from "@/types/booking.schema";
import { getAllBookings } from "@/utils/bookings.api";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const categoryColumnHelper = createColumnHelper<IBooking>();

export default function Bookings() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookings, isLoading: isBookingsLoading } = useQuery({
    queryKey: ["bookings", currentPage],
    queryFn: () => getAllBookings({ limit: 7, page: currentPage }),
  });
  const [data, setData] = useState<IBooking[]>([]);
  const columns = [
    categoryColumnHelper.accessor("firstName", {
      id: "fullNames",
      header: () => <span className="text-xs">Title</span>,
      cell: (info) => (
        <span className="font-medium text-sm capitalize">
          {info.getValue() + " " + info.row.original.lastName}
        </span>
      ),
    }),
    categoryColumnHelper.accessor("amount", {
      id: "hotelsCount",
      header: () => <span className="text-xs">Amount</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    categoryColumnHelper.accessor("numberOfRooms", {
      id: "numberOfRooms",
      header: () => <span className="text-xs">Number of Rooms</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    categoryColumnHelper.accessor("checkIn", {
      id: "Dates",
      header: () => <span className="text-xs">Stay Dates</span>,
      cell: (info) => (
        <span className="font-medium text-sm">
          {new Date(info.getValue()).toLocaleDateString() +
            " - " +
            new Date(info.row.original.checkOut).toLocaleDateString()}
        </span>
      ),
    }),
    categoryColumnHelper.accessor("room.name", {
      id: "room",
      header: () => <span className="text-xs">Status</span>,
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
    categoryColumnHelper.accessor("status", {
      id: "actions",
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
    if (bookings?.results) {
      setData(bookings?.results);
    }
  }, [bookings?.results]);

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between items-center pb-6">
        <Heading
          subTitle="These are bookings made for all hotels"
          subTitleClassName="font-bold text-sm"
        >
          All Bookings
        </Heading>
      </div>
      <CustomTable
        totalPages={bookings?.totalPages}
        currentPage={bookings?.page}
        handlePageChange={(page) => setCurrentPage(page)}
        table={table}
        isLoading={isBookingsLoading}
      />
    </div>
  );
}
