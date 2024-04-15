import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {

    const user = await db.user.findUnique({ where: { email } });
    
    return user;
  } catch {
    return null;
  }
};

export const getUserByName = async (name: string) => {
  try {

    const user = await db.user.findUnique({ where: { name } });
    
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getAllMembers = async () => {
  try {
    const users = await db.user.findMany({
      where: { role: UserRole.MEMBER },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        address: true,
        age: true,
        idType: true,
        idNo: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  } catch {
    return null;
  }
};

export const getAllAdmin = async () => {
  try {
    const users = await db.user.findMany({
      where: { role: UserRole.ADMIN },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        address: true,
        age: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  } catch {
    return null;
  }
};
export const deleteUserById = async (id: string) => {
  try {
    // Check if the user exists before deleting
    const userToDelete = await db.user.findUnique({ where: { id } });
    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Perform any additional checks for authorization or validation here if needed
    // For example, check if the user is an admin and prevent deletion if necessary

    await db.user.delete({ where: { id } });

    // Optionally, you can return a success message or simply return null if no errors occur
    return { success: "User deleted successfully" };
  } catch (error) {
    // Handle errors such as database errors or user not found error
    return { error: error instanceof Error ? error.message : "Error deleting user" };
  }
};