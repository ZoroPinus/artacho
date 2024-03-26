"use client";

import { documents } from "@/actions/document";
import BreadCrumb from "@/components/breadcrumb";
import { DocumentClient } from "@/components/tables/document-tables/client";
import { useEffect, useState } from "react";
import { Document } from "@/constants/data";
const breadcrumbItems = [{ title: "Document", link: "/dashboard/document" }];
export default function page() {
  const [data, setDocuments] = useState<Document[]>([]);
  const fetchDocuments = async () => {
    documents().then((res) => {
      // @ts-ignore
      setDocuments(res);
    });
  };

  useEffect(() => {
    fetchDocuments();
  }, [data]);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <DocumentClient data={data} isDashboard={false} />
      </div>
    </>
  );
}
