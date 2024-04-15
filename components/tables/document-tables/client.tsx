"use client";
import { DataTableDashboard } from "@/components/ui/data-table-dashboard";
import { DataTable } from "@/components/ui/data-table";
import { Document } from "@/constants/data";
import { columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columnsDashboard } from "@/components/tables/document-tables/columnsDashboard";
import { UserRole } from "@prisma/client";

interface DocumentProps {
  data: Document[];
  isDashboard: Boolean;
}

export const DocumentClient: React.FC<DocumentProps> = ({
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
        <DataTableDashboard columns={columnsDashboard} data={data} />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <Heading
              title={`Documents (${data.length})`}
              description="Manage Documents"
            />
            {UserRole.ADMIN ? (
              <>
                <Button
                  className="text-xs md:text-sm"
                  onClick={() => router.push(`/documents/upload`)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Upload New
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <Separator />
          <DataTable searchKeys={["memberName", "fileName", "fileType", "description"]} columns={columns} data={data} />
        </>
      )}
    </>
  );
};
