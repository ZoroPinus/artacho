"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableUserDashboard } from "@/components/ui/data-table-user-dashboard";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { Members } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { User } from "@/types";
import { UserRole } from "@prisma/client";

interface ProductsClientProps {
  data: User[];
  isDashboard: Boolean;
}

export const UserClient: React.FC<ProductsClientProps> = ({
  data,
  isDashboard,
}) => {
  const router = useRouter();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Admins (${data.length})`}
          description="Manage current admins "
        />
      </div>
      <Separator />
      <DataTable
        searchKeys={["email", "name", "phone"]}
        columns={columns}
        data={data}
      />
    </>
  );
};
