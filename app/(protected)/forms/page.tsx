"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import BreadCrumb from "@/components/breadcrumb";
import CertificationForm from "@/components/forms/certification-form";
import { FormModal } from "@/components/modal/formModal";
import BaptismCertificationForm from "@/components/forms/baptism-form";
import FinancialStatementForm from "@/components/forms/financial-statement-form";
import { FilePlus2 } from "lucide-react";
import { fetchAllBaptismCertificates, fetchAllCertificates, fetchAllFinancialStatements } from "@/actions/forms";

type ModalType = "certification" | "baptism" | "financial" | null;

const FormsPage = () => {
  const { data: session } = useSession();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [certificationCount, setCertificationCount] = useState<number>(0);
  const [baptismCount, setBaptismCount] = useState<number>(0);
  const [financialCount, setFinancialCount] = useState<number>(0);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const breadcrumbItems = [{ title: "Forms", link: "/dashboard/forms" }];

  let ModalContent;
  switch (modalType) {
    case "certification":
      ModalContent = <CertificationForm />;
      break;
    case "baptism":
      ModalContent = <BaptismCertificationForm />;
      break;
    case "financial":
      ModalContent = <FinancialStatementForm />;
      break;
    default:
      ModalContent = null;
  }
 useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baptism = await fetchAllBaptismCertificates();
      const certificates = await fetchAllCertificates();
      const financial = await fetchAllFinancialStatements();

      setBaptismCount(baptism.length);
      setCertificationCount(certificates.length);
      setFinancialCount(financial.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 h-screen">
              <div className="overflow-y-auto col-span-3">
                {/* CARDS */}
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-3 ">
                  <Card className="h-72 flex justify-center flex-col items-left" onClick={() => handleOpenModal("certification")}>
                    <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2">
                      <CardTitle className="text-4xl font-semibold">
                        Create Certification
                      </CardTitle>
                      <FilePlus2 size={48}/>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-medium">Total Certifications Created: {certificationCount}</div>
                    </CardContent>
                  </Card>
                  <Card className="h-72 flex justify-center flex-col items-left" onClick={() => handleOpenModal("baptism")}>
                    <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2">
                      <CardTitle className="text-4xl font-semibold">
                        Create Certificate of Baptism
                      </CardTitle>
                      <FilePlus2 size={48}/>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-medium">Total Certificate of Baptism Created: {baptismCount}</div>
                    </CardContent>
                  </Card>
                  <Card className="h-72 flex justify-center flex-col items-left" onClick={() => handleOpenModal("financial")}>
                    <CardHeader className="flex flex-row items-center  justify-between space-y-0 pb-2">
                      <CardTitle className="text-4xl font-semibold">
                        Create Financial Statement
                      </CardTitle>
                      <FilePlus2 size={48}/>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-medium">Total Financial Statement Created: {financialCount}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <FormModal isOpen={!!modalType} onClose={handleCloseModal}>
        {ModalContent}
      </FormModal>
    </ScrollArea>
  );
};

export default FormsPage;
