"use client";
import { DataTable } from "@/components/ui/data-table";
import { Document } from "@/constants/data";
import { columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columnsDashboard } from "@/components/tables/document-tables/columnsDashboard";

interface DocumentProps {
  data: Document[];
}

export const MemberDocumentClient: React.FC<DocumentProps> = ({
  data,
}) => {
  const router = useRouter();
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Member Documents (${data.length})`}
          description="Manage Documents"
        />
        
      </div>
      <Separator />
      <DataTable searchKey="fileName" columns={columns} data={data} />
    </>
  );
};
