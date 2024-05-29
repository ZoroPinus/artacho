"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Document } from "@/constants/data";

export const columnsDashboard: ColumnDef<Document>[] = [
  {
    accessorKey: "idNo",
    header: "ID",
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
  }
];
