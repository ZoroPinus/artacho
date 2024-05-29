import { db } from "@/lib/db";

export const getDocumentById = async (docid: string) => {
  try {
    const document = await db.document.findUnique({ where: { id:docid } });

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
        idNo: true,
        memberName: true,
        fileName: true,
        description: true,
        fileType: true,
        fileUrl: true,
        uploadedAt: true,
      },
      orderBy: { uploadedAt: "desc" },
    });

    return document;
  } catch {
    return null;
  }
};

export const getAllDocumentsByMember = async (memberName: string) => {
  try {
    const document = await db.document.findMany({
      where: { memberName: memberName },
      select: {
        id: true,
        idNo: true,
        memberName: true,
        fileName: true,
        description: true,
        fileType: true,
        fileUrl: true,
        uploadedAt: true,
      },
      orderBy: { uploadedAt: "desc" },
    });

    return document;
  } catch {
    return null;
  }
};
