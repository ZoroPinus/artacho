import BreadCrumb from "@/components/breadcrumb";
import { MemberRegistrationForm } from "@/components/auth/member-registration-form";
import { ScrollArea } from "@/components/ui/scroll-area";

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
