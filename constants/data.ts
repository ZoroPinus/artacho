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
  memberName: string;
  fileName: string;
  description: string;
  type: string;
  status: string;
  fileUrl:string;
  uploaded_at:Date
};


export const navItemsAdmin: NavItem[] = [
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
  },
  {
    title: "Admins",
    href: "/admins",
    icon: "admins",
    label: "admins",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "forms",
    label: "forms",
  }
];


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
    title: "Forms",
    icon: "forms",
    label: "forms",
    items: [
      {
        title: "Form 1",
        href: "/forms/form1",
        icon: "forms",
      },
      {
        title: "Form 2",
        href: "/forms/form2",
        icon: "forms",
      },
    ],
  },
];