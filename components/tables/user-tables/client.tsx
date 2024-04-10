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
import { columnsDashboard } from "./columnsDashboard";
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
      {isDashboard ? (
        <DataTableUserDashboard columns={columnsDashboard} data={data} />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <Heading
              title={`Users (${data.length})`}
              description="Manage current users "
            />

            {UserRole.ADMIN ? (
              <>
                <Button
                  className="text-xs md:text-sm"
                  onClick={() => router.push(`/members/create`)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <Separator />
          <DataTable searchKey="name" columns={columns} data={data} />
        </>
      )}
    </>
  );
};
