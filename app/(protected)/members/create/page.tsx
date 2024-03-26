import BreadCrumb from "@/components/breadcrumb";
import { MemberRegistrationForm } from "@/components/auth/member-registration-form";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { MemberRegisterSchema } from "@/schemas";
import { registerMember } from "@/actions/registerMember";
import { useSearchParams } from "next/navigation";

export default function UserCreatePage() {
  const breadcrumbItems = [
    { title: "Member", link: "/dashboard/members" },
    { title: "Create", link: "/dashboard/members/create" },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <MemberRegistrationForm />
      </div>
    </ScrollArea>
  );
}
