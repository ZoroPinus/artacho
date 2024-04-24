"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DocumentClient } from "@/components/tables/document-tables/client";
import { UserClient } from "@/components/tables/user-tables/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { useEffect, useState } from "react";
import { members, admin } from "@/actions/members";
import { documents } from "@/actions/document";
import { User } from "@/types";
import { Document } from "@/constants/data";
const DashboardPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>();

  const [memberData, setMembers] = useState<User[]>([]);
  const [documentData, setDocuments] = useState<Document[]>([]);
  const [adminCount, setAdminCount] = useState<number>(0);

  const fetchDocuments = async () => {
    documents().then((res) => {
      // @ts-ignore
      setDocuments(res);
    });
  };

  const getAdminCount = async () => {
    admin().then((res) => {
      // @ts-ignore
      setAdminCount(res);
    });
  };

  const fetchMembers = async () => {
    members().then((res) => {
      // @ts-ignore
      setMembers(res);
    });
  };

  useEffect(() => {
    getAdminCount();
    fetchDocuments();
    fetchMembers();
  }, []);

  const totalMembers = memberData.length;
  const totalDocuments = documentData.length;

  // Filter documents by file type (PNG or PDF)
  const pngDocuments = documentData.filter((doc) =>
    doc.fileUrl?.toLowerCase().endsWith(".png")
  );
  const pdfDocuments = documentData.filter((doc) =>
    doc.fileUrl?.toLowerCase().endsWith(".pdf")
  );
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          {/* <div className="hidden md:flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div> */}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-4 gap-4 h-screen">
              <div className="overflow-y-auto col-span-3">
                {/* CARDS */}
                <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Regular Members
                      </CardTitle>
                      {/* USERS ICON */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalMembers}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Admin Members
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{adminCount}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Documents Saved
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalDocuments}</div>
                    </CardContent>
                  </Card>
                </div>
                {/* TABLE */}
                <div className="py-5">
                  <Card>
                    <CardHeader>
                      <CardTitle>Uploads Today</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <DocumentClient data={documentData} isDashboard={true} />
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Members</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <UserClient data={memberData} isDashboard={true} />
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="h-full">
                <Card className="col-span-4 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-3xl">What Makes Up Your Documents?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Top */}
                    {/* PDF */}
                    <div className="py-3">
                      <div className="flex items-center space-x-4 w-full ">
                        <div className="w-1/2">
                          <p className="text-lg font-bold">PDFs</p>
                        </div>
                        <div className="w-1/2 flex items-center space-x-2">
                          <p className="text-lg font-bold flex-grow"></p>{" "}
                          <p className="text-lg font-bold ml-auto">{pdfDocuments.length}</p>{" "}
                        </div>
                      </div>
                      <Progress value={pdfDocuments.length/100} />
                    </div>
                    {/* PNG */}
                    <div className="py-3">
                      <div className="flex items-center space-x-4 w-full ">
                        <div className="w-1/2">
                          <p className="text-lg font-bold">PNG</p>
                        </div>
                        <div className="w-1/2 flex items-center space-x-2">
                          <p className="text-lg font-bold flex-grow"></p>{" "}
                          <p className="text-lg font-bold ml-auto">{pngDocuments.length}</p>{" "}
                        </div>
                      </div>
                      <Progress value={pngDocuments.length/100} />
                    </div>
                    {/* Bottom */}
                    <div
                      className={`mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center `}
                    >
                      <Upload size={63} />
                      <label
                        htmlFor="file-upload"
                        className={`relative mt-4 flex w-64 items-center justify-center text-xl font-bold leading-6 text-gray-900  `}
                      >
                        Upload Files
                      </label>
                      <label
                        htmlFor="file-upload"
                        className={`relative mt-4 flex w-64 items-center justify-center text-sm font-semibold leading-6 text-gray-400 `}
                      >
                        PNG and PDF files only
                      </label>
                    </div>
                    <Button
                      className="flex items-center w-full my-5"
                      onClick={() => router.push(`/documents/upload`)}
                    >
                      Upload Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};
export default DashboardPage;
