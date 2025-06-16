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
import AddSpotlight from "../AddSpotlight/AddSpotlight";

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
    accessorKey: "image",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        İsim
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const user:any = row?.original
      return (
        <div className="flex items-center gap-x-2">
          <Image src={row.getValue("image")} alt="" width={800} height={800} className="size-6 rounded-full border dark:border-neutral-800 border-black/20"/>
          <h1>{user?.fullName}</h1>
          {user?.firmStatus === true && <AddSpotlight id={user?.firm?.[0]?.id} firmName={user?.firm?.[0]?.firmName} description={user?.firm?.[0]?.firmDescription} image={user?.image} />}
        </div>
      )
    },
  },
  {
    accessorKey: "firmName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Firma
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex items-center gap-x-2">{row.getValue("firmName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "firmStatus",
    header: "Hesap",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("firmStatus") === true ? "Nakliyeci" : "Müşteri"}
      </div>
    ),
  },
  {
    accessorKey: "adminStatus",
    header: "Yetki",
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("adminStatus")}</div>
    ),
  },
  {
    accessorKey: "provinceFrom",
    header: "Konum",
    cell: ({ row }) => (
      <div>{row?.getValue("provinceFrom")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Telefon",
    cell: ({ row }) => (
      <div>{row?.getValue("phone")}</div>
    ),
  },
  {
    accessorKey:"createdAt",
    header: "Oluşturma",
    cell: ({ row }) => <div><TimeAgo timestamp={new Date(row.getValue("createdAt"))?.getTime()} size={'14px'}/></div>,
  },
];

export function DataTableDemo({ data }: { data: Payment[] }) {
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