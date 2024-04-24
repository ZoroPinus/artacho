import { RoleGate } from "@/components/auth/role-gate";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import { UserRole } from "@prisma/client";

const MembersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RoleGate allowedRole={UserRole.MEMBER}>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16">{children}</main>
        </div>
      </RoleGate>
    </>
    // <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    //   <Navbar />
    //   {children}
    // </div>
  );
};

export default MembersLayout;
