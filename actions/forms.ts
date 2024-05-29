"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import {
  CertificateSchema,
  BaptismCertificateSchema,
  FinancialStatementSchema,
} from "@/schemas";
import { currentUser } from "@/lib/auth";

export const uploadCertificate = async (
  values: z.infer<typeof CertificateSchema>
) => {
  const validatedFields = CertificateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, barangay, day, month } = validatedFields.data;

  const date = Date();
  await db.certificate.create({
    data: {
      name,
      barangay,
      date:date,
      day,
      month,
    },
  });

  return { success: "Certificate created successfully!" };
};

export const uploadFinancialStatement = async (
  values: z.infer<typeof FinancialStatementSchema>
) => {
  const validatedFields = FinancialStatementSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    date,
    total,
    tithesTotal,
    thanksgivingOfferingTotal,
    birthdayOfferingTotal,
    looseOfferingsTotal,
    sundayschoolOfferingTotal,
    adultsundayOfferingTotal,
    childrensundayOfferingTotal,
    tithes,
    thanksgivingOffering,
    birthdayOffering,
    others,
    summary,
  } = validatedFields.data;

  await db.financialStatement.create({
    data: {
      date,
      total,
      tithesTotal,
      thanksgivingOfferingTotal,
      birthdayOfferingTotal,
      looseOfferingsTotal,
      sundayschoolOfferingTotal,
      adultsundayOfferingTotal,
      childrensundayOfferingTotal,
      tithes: { create: tithes },
      thanksgivingOffering: { create: thanksgivingOffering },
      birthdayOffering: { create: birthdayOffering },
      others: { create: others },
      summary: { create: summary },
    },
  });

  return { success: "Financial Statement created successfully!" };
};
export const uploadBaptismCertificate = async (
  values: z.infer<typeof BaptismCertificateSchema>
) => {
  const validatedFields = BaptismCertificateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    name,
    pastorInCharge,
    father,
    mother,
    baptismDate,
    baptizedBy,
    birthDate,
    birthPlace,
    day,
    month,
    sponsors,
  } = validatedFields.data;

  await db.baptismCertificate.create({
    data: {
      name,
      pastorInCharge,
      father,
      mother,
      baptismDate,
      baptizedBy,
      birthDate,
      birthPlace,
      day,
      month,
      sponsors: {
        create: sponsors.map((sponsor: string) => ({ name: sponsor })),
      },
    },
  });

  return { success: "Baptism Certificate created successfully!" };
};

export const getCertificate = async (certificateId: string) => {
    return await db.certificate.findUnique({
      where: {
        id: certificateId,
      },
    });
  };
  
  export const getFinancialStatement = async (statementId: string) => {
    return await db.financialStatement.findUnique({
      where: {
        id: statementId,
      },
      include: {
        tithes: true,
        thanksgivingOffering: true,
        birthdayOffering: true,
        others: true,
        summary: true,
      },
    });
  };
  
  export const getBaptismCertificate = async (baptismId: string) => {
    return await db.baptismCertificate.findUnique({
      where: {
        id: baptismId,
      },
      include: {
        sponsors: true,
      },
    });
  };
  export const fetchAllCertificates = async () => {
    return await db.certificate.findMany();
  };
  
  export const fetchAllFinancialStatements = async () => {
    return await db.financialStatement.findMany();
  };
  
  export const fetchAllBaptismCertificates = async () => {
    return await db.baptismCertificate.findMany();
  };