import BreadCrumb from "@/components/breadcrumb";
import { UploadDocumentForm } from "@/components/forms/upload-document-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { DocumentType } from "@prisma/client";

export default function DocumentUploadPage() {
  const breadcrumbItems = [
    { title: "Documents", link: "/documents" },
    { title: "Upload", link: "/documents/upload" },
  ];
  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />

        <UploadDocumentForm
          categories={[
            { _id: DocumentType.PNG, name: DocumentType.PNG },
            { _id: DocumentType.PDF, name: DocumentType.PDF },
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
