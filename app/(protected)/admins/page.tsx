"use client";

import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/admin-tables/client";

import { useEffect, useState } from "react";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { admin } from "@/actions/members";
import { User } from "@/types";
const breadcrumbItems = [{ title: "Admins", link: "/dashboard/admins" }];

const AdminsPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [data, setMembers] = useState<User[] >([]);

  const fetchMembers = async () => {
    admin().then((res) => {
      // @ts-ignore
      setMembers(res);
      console.log(res)
    });
  };

  useEffect(() => {
    fetchMembers();
  }, [data]);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <RoleGate allowedRole={UserRole.ADMIN}>
          {/* <div>{members[0].id}</div> */}
          <BreadCrumb items={breadcrumbItems} />
          <UserClient data={data} isDashboard={false} />
        </RoleGate>
      </div>
    </>
  );
};
export default AdminsPage;
