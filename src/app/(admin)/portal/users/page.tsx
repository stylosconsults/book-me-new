"use client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import { CustomTable } from "@/components/molecules/Table";
import { IUser } from "@/types/user.schema";
import { getCategories } from "@/utils/category.api";
import { getAllUsers } from "@/utils/user.api";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const categoryColumnHelper = createColumnHelper<IUser>();

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getAllUsers({ limit: 7, page: currentPage }),
  });
  const [data, setData] = useState<IUser[]>([]);
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
    categoryColumnHelper.accessor("email", {
      id: "hotelsCount",
      header: () => <span className="text-xs">Email</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),
    categoryColumnHelper.accessor("role", {
      id: "role",
      header: () => <span className="text-xs">Role</span>,
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
    }),

    categoryColumnHelper.accessor("id", {
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
    if (users?.results) {
      setData(users?.results);
    }
  }, [users?.results]);

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between items-center pb-6">
        <Heading
          subTitle="These are categories of properties that are registered."
          subTitleClassName="font-bold text-sm"
        >
          All System Users
        </Heading>
        <Button className="h-fit">Add User</Button>
      </div>
      <CustomTable
        totalPages={users?.totalPages}
        currentPage={users?.page}
        handlePageChange={(page) => setCurrentPage(page)}
        table={table}
        isLoading={isUsersLoading}
      />
    </div>
  );
}
