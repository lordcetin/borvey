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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import TimeAgo from "../TimeAgo";
import Countdown from "../Countdown/Countdown";

// Örnek veri tipi
export type Payment = {
  id: any;
  image:any;
  adminStatus:any;
  offerText:any;
  price:any;
  time:any;
  status:any;
  paymentStatus: boolean;
  isActive: "active" | "deactive";
  role: any;
  email: string;
  fullName: string;
};

// Global filtre fonksiyonu
const globalFilterFn: FilterFn<Payment> = (row, columnId, filterValue: string) => {
  const searchTerm = filterValue.toLowerCase();
  const email = row.original.email?.toLowerCase() || "";
  const fullName = row.original.fullName?.toLowerCase() || "";
  const adminStatus = row.original.adminStatus?.toString().toLowerCase() || "";

  return (
    email.includes(searchTerm) ||
    fullName.includes(searchTerm) ||
    adminStatus.includes(searchTerm)
  );
};

// Sütun tanımları
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "profiles",
    header: "Hesap",
    cell: ({ row }:any) => {
      const user = row?.original
    return (
      <div className="capitalize flex items-center gap-x-2">
        <div className="flex items-center gap-x-2 relative">
          <Image src={row.getValue("profiles")?.image} alt="" width={800} height={800} className="size-9 rounded-full border dark:border-neutral-800 border-black/30 cursor-pointer"/>
        </div>
        <h1 className="pl-3">{row.getValue("profiles")?.fullName}</h1>
      </div>
    )
    }
  },
  {
    accessorKey: "provinceFrom",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Konum
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex items-center gap-x-2">{row.getValue("provinceFrom")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        İlan
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase w-52 whitespace-nowrap truncate">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "transportype",
    header: "Kategori",
    cell: ({ row }) => {
      const ilan:any = row?.original
      return (
        <div className="uppercase"><h1 className={` ${ilan?.transportype === 'evdenEve' ? "bg-amber-500 text-amber-950" : ilan?.transportype === 'tekliUrun' ? "bg-teal-500 text-teal-950" : ilan?.transportype === 'ofis' ? "bg-blue-500 text-blue-950" : ilan?.transportype === 'kisaMesafe' ? "bg-neutral-500 text-neutral-100" : ""} px-3 py-1 rounded-md font-semibold text-sm cursor-pointer max-md:hidden w-fit`}>{ilan?.transportype === 'evdenEve' ? "Evden Eve Nakliyat" : ilan?.transportype === 'tekliUrun' ? "Parça Eşya Nakliyat" : ilan?.transportype === 'ofis' ? "Ofis, Depo Nakliyat" : ilan?.transportype === 'kisaMesafe' ? "Kısa Mesafe Nakliyat" : null}</h1></div>
      )
    },
  },
  {
    accessorKey:"createdAt",
    header: "Oluşturma",
    cell: ({ row }) => <div><TimeAgo timestamp={new Date(row.getValue("createdAt"))?.getTime()} size={'14px'}/></div>,
  },
];

export function DataTableGig({ data }: { data: Payment[] }) {
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
          {/* <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
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