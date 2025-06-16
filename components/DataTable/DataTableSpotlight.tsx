/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  FilterFn,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import TimeAgo from "../TimeAgo";
import Countdown from "../Countdown/Countdown";
import RemoveSpotlight from "../RemoveSpotlight/RemoveSpotlight";

// Örnek veri tipi
export type Payment = {
  firmName: any;
  description:any;
  createdAt:any;
};

// Global filtre fonksiyonu
const globalFilterFn: FilterFn<Payment> = (row, columnId, filterValue: string) => {
  const searchTerm = filterValue.toLowerCase();
  const firmName = row.original.firmName?.toLowerCase() || "";
  const description = row.original.description?.toLowerCase() || "";

  return (
    firmName.includes(searchTerm) ||
    description.includes(searchTerm)
  );
};

// Sütun tanımları
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "firmName",
    header: "Hesap",
    cell: ({ row }:any) => {
      const user = row?.original
    return (
      <div className="capitalize flex items-center gap-x-2">
        <Image src={user?.image} alt="Firma Profil Resmi" width={800} height={800} className="size-9 rounded-full border dark:border-white/30 border-black/30"/>
        <h1 className="pl-3">{row.getValue("firmName")}</h1>
      </div>
    )
    }
  },
  {
    accessorKey: "description",
    header: "Açıklama",
    cell: ({ row }) => <div className="flex items-center gap-x-2">{row.getValue("description")}</div>,
  },
  {
    accessorKey:"createdAt",
    header: "Eklenme Tarihi",
    cell: ({ row }) => <div><TimeAgo timestamp={new Date(row.getValue("createdAt"))?.getTime()} size={'14px'}/></div>,
  },
  {
    header: "Kaldır",
    cell: ({ row }:any) => {
      const user = row?.original
    return (
      <div className="capitalize flex items-center gap-x-2">
        <RemoveSpotlight id={user?.id}/>
      </div>
    )
    }
  },
];

export function DataTableSpotlight({ data }: { data: Payment[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full dark:bg-black/20 bg-white p-5 rounded-3xl font-sans">
      <div className="flex items-center py-4 gap-x-4">
        <Input
          placeholder="Ara"
          value={globalFilter}
          onChange={(e:any) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="dark:bg-neutral-900">
              {table.getHeaderGroups().map((headerGroup:any) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header:any) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">

          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Geri
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              İleri
            </Button>
          </div>
        </div>
      </div>
    );
}