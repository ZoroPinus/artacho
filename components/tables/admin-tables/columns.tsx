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
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      return <span>{createdAt.toLocaleDateString()}</span>;
    },
  },
  // {
  //   accessorKey: "role",
  //   header: "ROLE",
  // },
  // {
  //   accessorKey: "loggedInAt",
  //   header: "Last Logged In",
  // },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
