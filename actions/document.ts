"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { UploadFormSchema } from "@/schemas";
import { DocumentType } from "@prisma/client";
import { currentUser } from "@/lib/auth";

import { getAllDocuments, getDocumentById } from "@/data/document";

export const uploadDocument = async (
  values: z.infer<typeof UploadFormSchema>
) => {
  const validatedFields = UploadFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { fileName, description, fileUrl, fileType } = validatedFields.data;

  const userId = await currentUser();

  await db.document.create({
    data: {
      fileName,
      description,
      fileUrl: fileUrl[0].fileUrl,
      fileType: fileType === "PDF" ? DocumentType.PDF : DocumentType.PNG,
      adminId: userId!.id,
    },
  });

  return { success: "Upload Complete!" };
};



export const deleteDocument = async (documentId: string) => {
  const document = await getDocumentById(documentId);

  if (!document) {
    return { error: "Document not found" };
  }

  // Check if the current user is authorized to delete the document
  const userId = await currentUser();
  if (!userId || userId.id ) {
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

  return fetchDocuments
};