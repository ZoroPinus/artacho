import { db } from "@/lib/db";

export const getDocumentById = async (id: string) => {
  try {
    const document = await db.document.findUnique({ where: { id } });

    return document;
  } catch {
    return null;
  }
};

export const getAllDocuments = async () => {
  try {
    const document = await db.document.findMany({
      select: {
        id: true,
        fileName: true,
        description: true,
        fileType: true,
        fileUrl: true,
        uploadedAt: true,
      },
      orderBy: { uploadedAt: 'desc' },
    });

    return document;
  } catch {
    return null;
  }
};
