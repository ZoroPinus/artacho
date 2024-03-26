import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();


export async function getAllMembers(): Promise<User[]> {
  try {
    const allMembers = await prisma.user.findMany();
    return allMembers;
  } catch (error) {
    throw error;
  }
}

export async function getMemberById(id: string): Promise<User | null> {
  try {
    const member = await prisma.user.findUnique({
      where: { id },
    });
    return member;
  } catch (error) {
    throw error;
  }
}

export async function updateMember(
  id: string,
  newData: Partial<User>
): Promise<User | null> {
  try {
    const updatedMember = await prisma.user.update({
      where: { id },
      data: newData,
    });
    return updatedMember;
  } catch (error) {
    throw error;
  }
}

export async function deleteMember(id: string): Promise<User | null> {
  try {
    const deletedMember = await prisma.user.delete({
      where: { id },
    });
    return deletedMember;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
