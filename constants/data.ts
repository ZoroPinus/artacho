import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: Date; // Consider using a proper date type if possible
  street: string;
  barangay: string;
  city: string;
  status: string;
};

export type Document = {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  fileUrl:string;
  uploaded_at:Date
};


export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Documents",
    href: "/documents",
    icon: "document",
    label: "document",
  },
  {
    title: "Members",
    href: "/members",
    icon: "members",
    label: "members",
  }
];
