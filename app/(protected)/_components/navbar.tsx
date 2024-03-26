"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";
import { navItems } from "@/constants/data";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    // <nav
    //   className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
    // >
    //   <div className="space-y-4 py-4">
    //     <div className="px-3 py-2">
    //       <div className="space-y-1">
    //         <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
    //           Overview
    //         </h2>
    //         <DashboardNav items={navItems} />
    //       </div>
    //     </div>
    //   </div>
    // </nav>

    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button 
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">
            Server
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">
            Client
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">
            Admin
          </Link>
        </Button>
        <Button 
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">
            Settings
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
