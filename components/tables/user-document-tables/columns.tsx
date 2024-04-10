"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Document } from "@/constants/data";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "memberName",
    header: "Member Name",
  },
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "fileType",
    header: "File Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "uploadedAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
