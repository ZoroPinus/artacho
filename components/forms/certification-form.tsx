"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { CertificateSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { uploadCertificate } from "@/actions/forms";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { User } from "@prisma/client";
import { members } from "@/actions/members";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type FormData = z.infer<typeof CertificateSchema>;

export default function CertificationForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CertificateSchema),
    defaultValues: {
      name: "",
      barangay: "",
      date: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [query, setQuery] = useState("");
  const [names, setNames] = useState<User[]>([]);
  const d = new Date();
  const year = d.getFullYear();
  const day = getDayWithSuffix(d);
  function getDayWithSuffix(date: any) {
    const day = date.getDate();
    let suffix = "th";

    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }

    return `${day}${suffix}`;
  }
  const month = d.toLocaleString("default", { month: "long" });
  const onSubmit = async (data: FormData) => {
    setIsGeneratingPdf(true);
    setError("");
    setSuccess("");
    startTransition(() => {
      uploadCertificate(data).then((data) => {
        if (data?.success) {
          createPDF();
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
    pdf.addImage(img, "PNG", 15, 40, pdfWidth, pdfHeight);
    pdf.save("certificate.pdf");
    setIsGeneratingPdf(false);
  };
  useEffect(() => {
    if (query.length > 0) {
      const fetchNames = async () => {
        const users = await members();
        // @ts-ignore
        setNames(users);
      };

      fetchNames();
    } else {
      setNames([]);
    }
  }, [query]);

  return (
    <div
      id="certificate"
      className="w-full h-full flex flex-col items-center justify-center"
    >
      {/* Header Start */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-20 h-20 mr-3">
          <Image
            src="https://utfs.io/f/d3fdfc03-cf46-467b-86e5-613e6a6e7acf-2a.png"
            alt="School Logo"
            layout="fill"
            className="rounded-full"
          />
        </div>
        <div className="text-left">
          <h1 className="text-xl font-semibold">
            UNITED CHURCH OF CHRIST IN THE PHILIPPINES
          </h1>
          <p className="text-md text-center font-semibold italic">
            Local Church UCCP-Artacho
          </p>
          <p className="text-md text-center font-semibold italic">
            Sison, Pangasinan
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-semibold text-center tracking-wide">
          CERTIFICATION
        </h1>
      </div>
      {/* Header End */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex-grow overflow-y-auto max-w-lg text-center"
      >
        <p className="text-justify indent-8">
          <div className="flex items-center">
            This is to certify that
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    type="text"
                    placeholder="Name"
                    className="border-b border-black text-center mx-1 "
                    onChange={(e) => {
                      field.onChange(e);
                      setQuery(e.target.value);
                    }}
                    value={query}
                  />
                  {names.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 z-10">
                      {names.map((name) => (
                        <li
                          key={name.id}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            field.onChange(name.name);
                            setQuery(name.name!);
                            setNames([]);
                            // Extracting barangay from the selected user's address
                            const addressArray = name.address!.split(","); // Assuming address format is comma-separated
                            const barangay = addressArray[0]; // Assuming barangay is the second element in the address
                            setValue("barangay", barangay);
                          }}
                        >
                          {name.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            />
            ,
          </div>
          of Barangay
          <Controller
            name="barangay"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Barangay"
                className="border-b border-black text-center mx-2 p-1"
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
          Issued this {day} day of {month}, {year} at United Church of Christ in the Philippines -
          Poblacion, San Gabriel, La Union.
        </p>

        {/* Submit Button */}

        {/* Footer */}
        <div className="text-right mt-auto pb-4">
          <p className="font-bold text-xl">REV. ARNEL B. PICAR</p>
          <p className="pb-3">
            Pastor-in-Charge, UCCP-Artacho, Sison, Pangasinan
          </p>
        </div>
        {!isGeneratingPdf && (
          <Button type="submit" className="w-full">
            Save
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
