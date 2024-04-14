"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/types";

export const columnsDashboard: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
  },
  {
    accessorKey: "age",
    header: "AGE",
  },
  {
    accessorKey: "gender",
    header: "GENDER",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
];
