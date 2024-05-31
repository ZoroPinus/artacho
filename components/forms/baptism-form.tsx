import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { BaptismCertificateSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { uploadBaptismCertificate } from "@/actions/forms";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import PDFSecurity from "jspdf";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type FormData = z.infer<typeof BaptismCertificateSchema>;

export default function BaptismCertificationForm() {
  const [sponsorInputs, setSponsorInputs] = useState([""]); // Initial state with one sponsor input

  const handleAddSponsorInput = () => {
    setSponsorInputs([...sponsorInputs, ""]); // Add an empty sponsor input
  };

  const handleRemoveSponsorInput = (indexToRemove: any) => {
    setSponsorInputs(
      sponsorInputs.filter((_, index) => index !== indexToRemove)
    ); // Remove the specified sponsor input
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(BaptismCertificateSchema),
    defaultValues: {
      name: "",
      father: "",
      mother: "",
      baptismDate: "",
      baptizedBy: "",
      sponsors: [],
      birthDate: "",
      birthPlace: "",
      day: "",
      month: "",
      pastorInCharge: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const onSubmit = async (data: FormData) => {
    setIsGeneratingPdf(true);
    setError("");
    setSuccess("");
    startTransition(() => {
      uploadBaptismCertificate(data).then((data) => {
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
    const data = await html2canvas(document.querySelector("#baptism_pdf")!);
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("baptism.pdf");

    setIsGeneratingPdf(false);
  };

  return (
    <div
      id="baptism_pdf"
      className="w-full h-full flex flex-col items-center justify-center"
    >
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
          <h1 className={cn("text-xl font-semibold", font.className)}>
            United Church of Christ in the Philippines
          </h1>
          <h1 className={cn("text-xl font-semibold", font.className)}>
            NORTH CENTRAL LUZON CONFERENCE
          </h1>
          <p className={cn("text-md font-semibold", font.className)}>
            Local Church UCCP-Aringay
          </p>
          <p className={cn("text-md font-semibold", font.className)}>
            Address: Aringay, La Union
          </p>
        </div>
      </div>
      {/* Header End */}

      <h1 className="text-3xl font-semibold text-center mb-6">
        CERTIFICATE OF BAPTISM
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex-grow overflow-y-auto max-w-lg text-left"
      >
        <p className="text-justify">To Whom It May Concern:</p>
        <p className="text-justify">
          This is to certify that on Page 20 Registry No. 643 in the Book of
          Baptism field in the achievs of local church under our charge, these
          are the following information:
        </p>
        <div className="flex justify-between">
          <div className="w-1/2">
            <label htmlFor="name" className="block">
              Name:
            </label>
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
          </div>
          <div className="w-1/2">
            <label htmlFor="father" className="block">
              Father's Name:
            </label>
            <Controller
              name="father"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Father's Name"
                  className="border-b border-black text-center mx-2"
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2">
            <label htmlFor="mother" className="block">
              Mother's Name:
            </label>
            <Controller
              name="mother"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Mother's Name"
                  className="border-b border-black text-center mx-2"
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="baptismDate" className="block">
              Baptism Date:
            </label>
            <Controller
              name="baptismDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Baptism Date"
                  className="border-b border-black text-center mx-2"
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2">
            <label htmlFor="birthDate" className="block">
              Date of Birth:
            </label>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Date of Birth"
                  className="border-b border-black text-center mx-2"
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="birthPlace" className="block">
              Place of Birth:
            </label>
            <Controller
              name="birthPlace"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Place of Birth"
                  className="border-b border-black text-center mx-2"
                />
              )}
            />
          </div>
        </div>
        {/* Add similar sections for other fields */}
        <div className="flex justify-between">
          <div className="w-1/2">
            <label htmlFor="baptizedBy" className="block">
              Baptized By:
            </label>
            <Controller
              name="baptizedBy"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Baptized By"
                  className="border-b border-black text-center mx-2"
                />
              )}
            />
          </div>
          <div className="flex justify-between">
            <div className="w-1/2">
              <label>Sponsors:</label>
              {sponsorInputs.map((sponsor, index) => (
                <div key={index}>
                  <Controller
                    name={`sponsors.${index}`}
                    control={control}
                    defaultValue={sponsor}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Sponsor"
                        className="border-b border-black text-center mx-2"
                      />
                    )}
                  />
                  {/* Show remove button for all but the first input */}
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSponsorInput(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {/* Show add button */}
              <button type="button" onClick={handleAddSponsorInput}>
                Add Sponsor
              </button>
            </div>
          </div>
        </div>

        {/* Add similar sections for other fields */}

        <p className="text-justify">
          The above is true and accurate experts of the original on file. In
          witness whereof, here unto affixed my signature and the official seal
          of this church.
        </p>

        <p className="text-justify">
          Given this
          <Controller
            name="day"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Day"
                className="border-b border-black text-center mx-2"
              />
            )}
          />
          of
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
          in the year of our Lord 2024.
        </p>

        {/* Footer */}
        <div className="text-right mt-auto">
          <Controller
            name="pastorInCharge"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Name of Pastor"
                className="border-b border-black text-center mx-2"
              />
            )}
          />
          <p>Pastor in Charge</p>
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
