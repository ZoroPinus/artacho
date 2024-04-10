"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { MemberRegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByName } from "@/data/user";

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

  await db.user.create({
    data: {
      name,
      email,
      phone,
      address,
      age,
      gender,
      role:'MEMBER'
    },
  });

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: "Registration Complete!" };
};
