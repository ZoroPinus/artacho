"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { UploadFormSchema } from "@/schemas";
import { DocumentType } from "@prisma/client";
import { currentUser } from "@/lib/auth";

import { getAllDocuments, getAllDocumentsByMember, getDocumentById } from "@/data/document";

export const uploadDocument = async (
  values: z.infer<typeof UploadFormSchema>
) => {
  const validatedFields = UploadFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { memberName, fileName, description, fileUrl } = validatedFields.data;

  const userId = await currentUser();

  let fileTypes = "";

  if (fileUrl[0].fileUrl.endsWith(".pdf")) {
    fileTypes = "PDF";
  } else {
    fileTypes = "PNG";
  }

  // Retrieve the latest idNo value from the document table
  const latestDocument = await db.document.findFirst({
    orderBy: { idNo: "desc" },
  });

  let idNo: string;

  if (latestDocument) {
    // Convert the retrieved idNo value to an integer, increment it by 1, and convert it back to a string
    const latestIdNo = parseInt(latestDocument.idNo);
    idNo = (latestIdNo + 1).toString().padStart(4, '0');
  } else {
    // If there are no existing documents, start with idNo "0001"
    idNo = "0001";
  }

  // Create a new document with the incremented idNo value
  await db.document.create({
    data: {
      idNo,
      memberName,
      fileName,
      description,
      fileUrl: fileUrl[0].fileUrl,
      fileType: fileTypes === "PDF" ? DocumentType.PDF : DocumentType.PNG,
      adminId: userId!.id,
    },
  });

  return { success: "Upload Complete!" };
};

export const deleteDocument = async (documentId: string) => {
  console.log(documentId)
  const document = await getDocumentById(documentId);
  if (!document) {
    console.log(document)
    return { error: "Document not found" };
  }

  // Check if the current user is authorized to delete the document
  const userId = await currentUser();
  if (!userId || !userId.id) {
    return { error: "Unauthorized to delete this document" };
  }

  await db.document.delete({
    where: {
      id: documentId,
    },
  });

  return { success: "Document deleted successfully" };
};

export const documents = async () => {
  const fetchDocuments = await getAllDocuments();

  if (fetchDocuments == null) {
    return { error: "No Result" };
  }

  return fetchDocuments;
};

export const getDocumentsByMember = async (memberName:string) => {
  const fetchDocuments = await getAllDocumentsByMember(memberName);

  if (fetchDocuments == null) {
    return { error: "No Result" };
  }

  return fetchDocuments;
};