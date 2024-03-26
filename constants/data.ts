import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
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
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
  fileUrl:string;
  uploaded_at:Date
};



export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    date_of_birth: new Date(1990, 5, 15), // June 15, 1990
    street: '123 Main St',
    barangay: 'Barangay ABC',
    city: 'City XYZ',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    gender: 'Female',
    date_of_birth: new Date(1985, 10, 25), // November 25, 1985
    street: '456 Elm St',
    barangay: 'Barangay DEF',
    city: 'City PQR',
    status: 'Active',
  },
  { 
    id: 3,
    name: 'Alice Johnson',
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alicejohnson@example.com',
    phone: '555-123-4567',
    gender: 'Female',
    date_of_birth: new Date(1988, 3, 10), // April 10, 1988
    street: '789 Oak St',
    barangay: 'Barangay GHI',
    city: 'City UVW',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Bob Anderson',
    first_name: 'Bob',
    last_name: 'Anderson',
    email: 'bobanderson@example.com',
    phone: '777-999-8888',
    gender: 'Male',
    date_of_birth: new Date(1995, 7, 20), // August 20, 1995
    street: '321 Maple Ave',
    barangay: 'Barangay JKL',
    city: 'City MNO',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Eva Martinez',
    first_name: 'Eva',
    last_name: 'Martinez',
    email: 'evamartinez@example.com',
    phone: '111-222-3333',
    gender: 'Female',
    date_of_birth: new Date(1983, 11, 5), // December 5, 1983
    street: '555 Pine St',
    barangay: 'Barangay PQR',
    city: 'City STU',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Michael Brown',
    first_name: 'Michael',
    last_name: 'Brown',
    email: 'michaelbrown@example.com',
    phone: '444-555-6666',
    gender: 'Male',
    date_of_birth: new Date(1975, 2, 15), // March 15, 1975
    street: '999 Walnut St',
    barangay: 'Barangay XYZ',
    city: 'City WXY',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Sara Wilson',
    first_name: 'Sara',
    last_name: 'Wilson',
    email: 'sarawilson@example.com',
    phone: '222-333-4444',
    gender: 'Female',
    date_of_birth: new Date(1992, 9, 30), // October 30, 1992
    street: '777 Cedar St',
    barangay: 'Barangay ABC',
    city: 'City DEF',
    status: 'Inactive',
  },
  {
    id: 8,
    name: 'David Lee',
    first_name: 'David',
    last_name: 'Lee',
    email: 'davidlee@example.com',
    phone: '888-777-9999',
    gender: 'Male',
    date_of_birth: new Date(1980, 6, 12), // July 12, 1980
    street: '111 Oakwood Ave',
    barangay: 'Barangay GHI',
    city: 'City JKL',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Emily Taylor',
    first_name: 'Emily',
    last_name: 'Taylor',
    email: 'emilytaylor@example.com',
    phone: '999-888-7777',
    gender: 'Female',
    date_of_birth: new Date(1998, 4, 25), // May 25, 1998
    street: '222 Birch St',
    barangay: 'Barangay MNO',
    city: 'City PQR',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Daniel Rodriguez',
    first_name: 'Daniel',
    last_name: 'Rodriguez',
    email: 'danielrodriguez@example.com',
    phone: '333-444-5555',
    gender: 'Male',
    date_of_birth: new Date(1987, 1, 7), // February 7, 1987
    street: '444 Pineapple Blvd',
    barangay: 'Barangay STU',
    city: 'City VWX',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Sophia Clark',
    first_name: 'Sophia',
    last_name: 'Clark',
    email: 'sophiaclark@example.com',
    phone: '666-777-8888',
    gender: 'Female',
    date_of_birth: new Date(1979, 8, 17), // September 17, 1979
    street: '888 Cherry Ln',
    barangay: 'Barangay YZA',
    city: 'City BCD',
    status: 'Active',
  },
  {
    id: 12,
    name: 'William White',
    first_name: 'William',
    last_name: 'White',
    email: 'williamwhite@example.com',
    phone: '555-666-7777',
    gender: 'Male',
    date_of_birth: new Date(1993, 12, 30), // December 30, 1993
    street: '333 Elmwood Dr',
    barangay: 'Barangay EFG',
    city: 'City HIJ',
    status: 'Inactive',
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Members = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; 
  address: string;
  age: string; 
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
