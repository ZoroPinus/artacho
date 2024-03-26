"use server";

import { getAllMembers, getUserById } from "@/data/user";

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


