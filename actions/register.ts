"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { UserRole } from "@prisma/client";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name,phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Generate a unique user ID here
  const userId = await generateUserId();

  await db.user.create({
    data: {
      id: userId,
      name,
      email,
      phone:phone,
      password: hashedPassword,
      role: UserRole.ADMIN
    },
  });

  return { success: "Registration Complete!" };
};

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