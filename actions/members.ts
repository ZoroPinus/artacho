"use server";

import { getAllMembers, getUserById, getAllAdmin } from "@/data/user";

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

export const admin = async () => {
  const fetchAdmins = await getAllAdmin();
  const adminCount = fetchAdmins!.length;
  if (fetchAdmins == null) {
    return { error: "No Result" };
  }

  return adminCount
};


