"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { User } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "idType",
    header: "ID TYPE",
    
  },
  {
    accessorKey: "idNo",
    header: "ID NUMBER",
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
