"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { CertificateSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { uploadCertificate } from "@/actions/forms";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type FormData = z.infer<typeof CertificateSchema>;

export default function CertificationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CertificateSchema),
    defaultValues: {
      name: "",
      barangay: "",
      day: "",
      month: "",
      date: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const onSubmit = async (data: FormData) => {
    setIsGeneratingPdf(true)
    setError("");
    setSuccess("");
    startTransition(() => {
      uploadCertificate(data).then((data) => {
        if (data?.success) {
          createPDF()
          setSuccess(data?.success);
        } else {
          setError(data?.error);
        }
      });
    });
  };
  const createPDF = async () => {   
    const pdf = new jsPDF("portrait", "pt", "a4"); 
    const data = await html2canvas(document.querySelector("#certificate")!);
    const img = data.toDataURL("image/png");  
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("certificate.pdf");
    setIsGeneratingPdf(false)
    
  };
  return (
    <div id="certificate" className="w-full h-full flex flex-col items-center justify-center">
      {/* Header Start */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-16 h-16 mr-3">
          <Image
            src="https://utfs.io/f/d3fdfc03-cf46-467b-86e5-613e6a6e7acf-2a.png"
            alt="School Logo"
            layout="fill"
            className="rounded-full"
          />
        </div>
        <div className="text-center">
          <h1 className={cn("text-3xl font-semibold", font.className)}>
            UNITED CHURCH OF CHRIST IN THE PHILIPPINES
          </h1>
          <p className={cn("text-md font-semibold", font.className)}>
            Poblacion, San Gabriel, La Union
          </p>
        </div>
      </div>
      {/* Header End */}

      <h1 className="text-3xl font-semibold text-center mb-6">CERTIFICATION</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex-grow overflow-y-auto max-w-lg text-center"
      >
        <p className="text-justify indent-8">
          This is to certify that
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Name"
                className="border-b border-black text-center mx-2"
              />
            )}
          />
          , of Barangay
          <Controller
            name="barangay"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Barangay"
                className="border-b border-black text-center mx-2"
              />
            )}
          />
          , La Union is a member of the United Church of Christ in the
          Philippines - Poblacion, San Gabriel, La Union in good standing.
        </p>

        <p className="text-justify indent-8">
          This certification is being issued upon his/her request for all legal
          intents and purposes it may serve.
        </p>

        <p className="text-justify indent-8">
          Issued this
          <Controller
            name="day"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Day"
                className="border-b border-black text-center mx-1"
              />
            )}
          />{" "}
          day of
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Month"
                className="border-b border-black text-center mx-2"
              />
            )}
          />
          , 2024 at United Church of Christ in the Philippines - Poblacion, San
          Gabriel, La Union.
        </p>

        {/* Submit Button */}

        {/* Footer */}
        <div className="text-right mt-auto">
          <p className="font-bold text-xl">REV. ARNEL B. PICAR</p>
          <p>Pastor-in-Charge, UCCP, San Gabriel, LU</p>
        </div>
        {!isGeneratingPdf && (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <div className="text-red-500 text-sm mt-2">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
