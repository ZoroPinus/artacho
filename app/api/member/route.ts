import { NextApiRequest, NextApiResponse } from "next";
import {
  updateMember,
  deleteMember,
  getAllMembers,
} from "@/data/members";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const member = await getAllMembers();
    if (!member) {
      return NextResponse.json({ error: "Member not found" });
    } else {
      return NextResponse.json(member);
    }
  } catch (error) {
    return NextResponse.json({ error: "Error getting member" });
  }
}

export async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body, query } = req;
  try {
    const id = Array.isArray(query.id) ? query.id[0] : query.id;
    const updatedMember = await updateMember(id as string, body);
    if (!updatedMember) {
      res.status(404).json({ error: "Member not found" });
    } else {
      res.status(200).json(updatedMember);
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating member" });
  }
}

export async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  try {
    const id = Array.isArray(query.id) ? query.id[0] : query.id;
    const deletedMember = await deleteMember(id as string);
    if (!deletedMember) {
      res.status(404).json({ error: "Member not found" });
    } else {
      res.status(200).json({ message: "Member deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting member" });
  }
}
