"use server";

import { getAllMembers, getUserById, getAllAdmin, deleteUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
export const members = async () => {
  const fetchMembers = await getAllMembers();

  if (fetchMembers == null) {
    return { error: "No Result" };
  }

  return fetchMembers
};

export const getInputFields = async (id:string) =>{
  const fetchInputFields = getUserById(id)

  if (fetchInputFields == null){
    return { error: "No Result" };
  }

  return fetchInputFields
}

export const deleteUser = async (id: string) => {
  const userToDelete = await getUserById(id);

  if (!userToDelete) {
    return { error: "User not found" };
  }

   // Check if the current user is an admin
   const currentUserData = await currentUser();
   if (!currentUserData || currentUserData.role !== "ADMIN") {
     return { error: "Unauthorized to delete users" };
   }
  
  await deleteUserById(id);

  return { success: "User deleted successfully" };
};


export const admin = async () => {
  const fetchAdmins = await getAllAdmin();
  const adminCount = fetchAdmins!.length;
  if (fetchAdmins == null) {
    return { error: "No Result" };
  }

  return adminCount
};


