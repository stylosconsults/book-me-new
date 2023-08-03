import { flexRender } from "@tanstack/react-table";

import { ComponentProps, PropsWithChildren } from "react";
import { Table } from "@tanstack/react-table";
import cn from "@/lib/classNames";
import Pagination, { IPaginationProps } from "./Pagination";

export type TableProps = PropsWithChildren<ComponentProps<"table">>;
export type THeadProps = PropsWithChildren<ComponentProps<"thead">>;
export type TBodyProps = PropsWithChildren<ComponentProps<"tbody">>;
export type TFootProps = PropsWithChildren<ComponentProps<"tfoot">>;
export type TrProps = PropsWithChildren<ComponentProps<"tr">>;
export type ThProps = PropsWithChildren<ComponentProps<"th">>;
export interface TdProps
  extends Omit<PropsWithChildren<ComponentProps<"td">>, "color"> {
  border?: boolean; // border-right
  center?: boolean;
}

export interface CustomTableProps<TData> extends Partial<IPaginationProps> {
  table: Table<TData>;
  isLoading?: boolean;
  checkBoxCol?: keyof TData;
  error?: string;
}

export interface MarksTableProps<TData> {
  table: Table<TData>;
  firstColName: keyof TData;
}

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <div className="rounded-xl overflow-auto md:overflow-hidden w-full border border-t-0">
      <table {...props} className={cn(`w-full ${className}`)}>
        {children}
      </table>
    </div>
  );
};

const THead = ({ children, className, ...props }: THeadProps) => {
  return (
    <thead {...props} className={cn(`text-left capitalize ${className}`)}>
      {children}
    </thead>
  );
};

const TBody = ({ children, className, ...props }: TBodyProps) => {
  return (
    <tbody {...props} className={cn(`${className}`)}>
      {children}
    </tbody>
  );
};

const Td = ({ children, border, center, className, ...props }: TdProps) => {
  return (
    <td
      {...props}
      className={cn(`first:pl-4 last:pr-4 py-5 text-sm text-gray-900  ${
        border ? "border-r" : ""
      } 
      ${center ? "text-center" : ""} ${className}`)}
    >
      {children}
    </td>
  );
};

const Th = ({ children, className, ...props }: ThProps) => {
  return (
    <th
      {...props}
      className={cn(
        `font-medium first:pl-4 py-4 bg-[#F6F6F6] text-xs text-gray-400 capitalize last:pr-6 ${className}`
      )}
    >
      {children}
    </th>
  );
};

const Tr = ({ children, className, ...props }: TrProps) => {
  return (
    <tr
      {...props}
      className={`border-b last:border-b-0 hover:bg-secondary-200 ${className}`}
    >
      {children}
    </tr>
  );
};

const CustomTable = <TData,>({
  table,
  isLoading,
  checkBoxCol,
  totalPages,
  handlePageChange,
  currentPage,
}: CustomTableProps<TData>) => {
  return (
    <div>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <Tr key={headerGroup.id + i + "-hrow"}>
              {headerGroup.headers.map((header, j) =>
                checkBoxCol && checkBoxCol === header.id ? (
                  <Th
                    data-colid="checkbox"
                    className="w-[3rem]"
                    key={header.id + i + j + "-hcell"}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ) : (
                  <Th data-colid="data" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                )
              )}
            </Tr>
          ))}
        </THead>
        <TBody>
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, key) => (
                <Tr
                  key={"row" + key + "-loading"}
                  className="hover:bg-transparent"
                >
                  {Array.from({
                    length: table.getVisibleFlatColumns().length,
                  }).map((_, colKey) => (
                    <Td key={colKey}>
                      <div className="h-2 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                    </Td>
                  ))}
                </Tr>
              ))}
            </>
          ) : (
            <>
              {table.getRowModel().rows.length <= 0 ? (
                <Tr key={"no-data-row"} className="hover:bg-inherit">
                  <Td
                    colSpan={table.getAllColumns().length}
                    className="capitalize text-center text-xs"
                  >
                    data is empty
                  </Td>
                </Tr>
              ) : (
                <>
                  {table.getRowModel().rows.map((row, i) => (
                    <Tr key={row.id + i + "-drow"}>
                      {row.getVisibleCells().map((cell, j) =>
                        checkBoxCol && checkBoxCol === cell.column.id ? (
                          <Td
                            className="w-[3rem]"
                            key={cell.id + i + j + "-dcell"}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        ) : (
                          <Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        )
                      )}
                    </Tr>
                  ))}
                </>
              )}
            </>
          )}
        </TBody>
      </Table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export { Table, TBody, Tr, Td, Th, THead, CustomTable };
