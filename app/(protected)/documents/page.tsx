"use client";

import { documents, getDocumentsByMember } from "@/actions/document";
import BreadCrumb from "@/components/breadcrumb";
import { DocumentClient } from "@/components/tables/document-tables/client";
import { useEffect, useState } from "react";
import { Document } from "@/constants/data";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
const breadcrumbItems = [{ title: "Documents", link: "/documents" }];
export default function DocumentsPage() {
  const { data: session } = useSession();
  const [data, setDocuments] = useState<Document[]>([]);
  const fetchDocuments = async () => {
    if(session!.user!.role! == UserRole.ADMIN){
      documents().then((res) => {
        // @ts-ignore
        setDocuments(res);
      });
    }else{
      if(session){
        getDocumentsByMember(session.user!.name!).then((res) => {
          // @ts-ignore
          setDocuments(res);
        });
      }
    }
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
