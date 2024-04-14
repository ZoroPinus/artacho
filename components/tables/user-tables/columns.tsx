"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
