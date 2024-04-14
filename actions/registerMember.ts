"use server"

import * as z from "zod";

import { db } from "@/lib/db";
import { MemberRegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByName } from "@/data/user";
import { UserRole } from "@prisma/client";

export const registerMember = async (
  values: z.infer<typeof MemberRegisterSchema>
) => {
  const validatedFields = MemberRegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, phone, address, age, gender } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  const existingUser2 = await getUserByName(name);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  if (existingUser2) {
    return { error: "Name already in use!" };
  }

  // Generate a unique user ID based on the current date and role
  const userId = generateUserId();

  await db.user.create({
    data: {
      id: userId,
      name,
      email,
      phone,
      address,
      age,
      gender,
      role: UserRole.MEMBER // Assuming UserRole is imported from Prisma
    },
  });

  return { success: "Registration Complete!" };
};

// Function to generate a unique user ID based on date
const generateUserId = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = dateNow.getMonth() + 1;
  const day = dateNow.getDate();
  const roleCode = UserRole.ADMIN ? "A" : "M";

  // Combine date parts and role code to create a unique ID
  const userId = `${year}${month}${day}${roleCode}${Math.floor(Math.random() * 10000)}`;

  return userId;
};