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

export const documents = async () => {
  const fetchDocuments = await getAllDocuments();

  if (fetchDocuments == null) {
    return { error: "No Result" };
  }

  return fetchDocuments
};