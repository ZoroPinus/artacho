"use client"

import { useParams } from 'next/navigation'
import { documents, getDocumentsByMember } from "@/actions/document";
import BreadCrumb from "@/components/breadcrumb";
import { MemberDocumentClient } from "@/components/tables/user-document-tables/client";
import { useEffect, useState } from "react";
import { Document } from "@/constants/data";
export default function MemberPage() {
  const params = useParams()
  const breadcrumbItems = [{ title: "Members", link: "/members" }];
  const id = Array.isArray(params.id) ? decodeURIComponent(params.id[0]) : decodeURIComponent(params.id); 

  const [data, setDocuments] = useState<Document[]>([]);

  
  const fetchDocumentsForUser = async () => {
    getDocumentsByMember(id).then((res) => {
      // @ts-ignore
      setDocuments(res);
    });
  };

  useEffect(() => {
    fetchDocumentsForUser();
  }, [data]);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <MemberDocumentClient data={data} />
      </div>
    </>
  );
}