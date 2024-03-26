import BreadCrumb from "@/components/breadcrumb";
import { UploadDocumentForm } from "@/components/forms/upload-document-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { DocumentType } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


export default function Page() {
  const breadcrumbItems = [
    { title: "Documents", link: "/dashboard/documents" },
    { title: "Upload", link: "/dashboard/documents/upload" },
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
