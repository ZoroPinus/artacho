"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { FinancialStatementSchema } from "@/schemas";
import { Card } from "@/components/ui/card"; // Ensure this path is correct
import { useEffect, useState, useTransition } from "react";
import SummaryCard from "../summarycard";
import CashMultiplier from "../cashmulitplier";
import { uploadFinancialStatement } from "@/actions/forms";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type FormData = z.infer<typeof FinancialStatementSchema>;
interface Item {
  title: string;
  amount: string;
}

const initialItemsState: Item[] = Array.from({ length: 4 }, () => ({
  title: "",
  amount: "",
}));

export default function FinancialStatementForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FinancialStatementSchema),
    defaultValues: {
      date: "",
      total: "",
      tithesTotal: "",
      thanksgivingOfferingTotal: "",
      birthdayOfferingTotal: "",
      looseOfferingsTotal: "",
      sundayschoolOfferingTotal: "",
      childrensundayOfferingTotal: "",
      adultsundayOfferingTotal: "",
      tithes: initialItemsState,
      thanksgivingOffering: initialItemsState,
      birthdayOffering: initialItemsState,
      others: initialItemsState,
      summary: initialItemsState,
    },
  });
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [offerings, setOfferings] = useState<{ [key: string]: Item[] }>({
    tithes: initialItemsState,
    thanksgivingOffering: initialItemsState,
    birthdayOffering: initialItemsState,
    others: initialItemsState,
  });

  const [totalAmounts, setTotalAmounts] = useState<{ [key: string]: number }>({
    tithes: 0,
    thanksgivingOffering: 0,
    birthdayOffering: 0,
    others: 0,
  });
  const [totalSummary, setTotalSummary] = useState<number>(0);
  const [sundayschoolOfferingTotal, setSundayschoolOfferingTotal] =
    useState<number>(0);
  const [childrensundayOfferingTotal, setChildrensundayOfferingTotal] =
    useState<number>(0);
  const [adultsundayOfferingTotal, setAdultsundayOfferingTotal] =
    useState<number>(0);
  const handleOfferingChange = (
    type: string,
    index: number,
    field: keyof Item,
    value: string
  ) => {
    const updatedOfferings = { ...offerings };
    updatedOfferings[type] = updatedOfferings[type].map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setOfferings(updatedOfferings);
  };
  const calculateTotalSummary = () => {
    const adultOfferingValue =
      typeof adultsundayOfferingTotal === "number"
        ? adultsundayOfferingTotal
        : 0;
    const childrenOfferingValue =
      typeof childrensundayOfferingTotal === "number"
        ? childrensundayOfferingTotal
        : 0;
    const sundaySchoolValue =
      typeof sundayschoolOfferingTotal === "number"
        ? sundayschoolOfferingTotal
        : 0;

    // Sum up the total amounts from the totalAmounts object
    const totalOfferings = Object.values(totalAmounts).reduce(
      (acc, curr) => acc + curr,
      0
    );

    let total =
      adultOfferingValue +
      childrenOfferingValue +
      sundaySchoolValue +
      totalOfferings;

    setTotalSummary(total);
  };

  useEffect(() => {
    calculateTotalAmount("tithes");
    calculateTotalAmount("thanksgivingOffering");
    calculateTotalAmount("birthdayOffering");
    calculateTotalAmount("others");

    calculateTotalSummary();
  }, [offerings]);

  const calculateTotalAmount = (type: string) => {
    const total = offerings[type].reduce(
      (acc, item) => acc + parseFloat(item.amount || "0"),
      0
    );
    setTotalAmounts((prevTotalAmounts) => ({
      ...prevTotalAmounts,
      [type]: total,
    }));
  };

  const renderOfferingInputs = (type: string) => {
    return offerings[type].map((item, index) => (
      <div key={index} className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={item.title}
          onChange={(e) =>
            handleOfferingChange(type, index, "title", e.target.value)
          }
          className="border-b border-black text-center mx-1 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={item.amount}
          onChange={(e) =>
            handleOfferingChange(type, index, "amount", e.target.value)
          }
          className="border-b border-black text-center mx-1 w-full"
        />
      </div>
    ));
  };

  const renderTotalAmount = (type: string) => {
    return (
      <p>
        Total {type.charAt(0).toUpperCase() + type.slice(1)} Amount:{" "}
        {totalAmounts[type]}
      </p>
    );
  };

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const onSubmit = async (data: FormData) => {
    setIsGeneratingPdf(true);
    setError("");
    setSuccess("");
    startTransition(() => {
      uploadFinancialStatement(data).then((data) => {
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
    const data = await html2canvas(
      document.querySelector("#financial_statement")!
    );
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("financial_statement.pdf");
    setIsGeneratingPdf(false);
  };
  return (
    <div
      id="financial_statement"
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
          <p className="text-md font-semibold italic">
            North Central Luzon Conference-Parish 1
          </p>
          <p className="text-md font-semibold italic">
            Artacho, Sison, Pangasinan
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-semibold text-center tracking-wide">
          FINANCIAL STATEMENT
        </h1>
      </div>
      {/* Header End */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full text-center flex justify-center flex-col items-center"
      >
        <div className="mb-4 w-52">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="border-b border-black text-center mx-2 w-full"
              />
            )}
          />
          <label htmlFor="date" className="block">
            Date
          </label>
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
            <h1 className="mb-4">Tithes and Pledges</h1>
            {renderOfferingInputs("tithes")}
            {renderTotalAmount("tithes")}
          </Card>

          <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
            <h1 className="mb-4">Thanksgiving Offering</h1>
            {renderOfferingInputs("thanksgivingOffering")}
            {renderTotalAmount("thanksgivingOffering")}
          </Card>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
            <h1 className="mb-4">Birthday Offering</h1>
            {renderOfferingInputs("birthdayOffering")}
            {renderTotalAmount("birthdayOffering")}
          </Card>

          <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
            <h1 className="mb-4">Others</h1>
            {renderOfferingInputs("others")}
            {renderTotalAmount("others")}
          </Card>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
            <h1 className="mb-4">SUMMARY</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="looseOfferingsTotal">Loose Offerings:</label>
              <Controller
                name={"looseOfferingsTotal"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={totalAmounts["others"].toString()}
                    className="border-b border-black text-center mx-1 w-full"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="tithesTotal">Tithes and Pledges:</label>
              <Controller
                name={"tithesTotal"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={totalAmounts["tithes"].toString()}
                    className="border-b border-black text-center mx-1 w-full"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="thanksgivingOfferingTotal">
                Thanksgiving Offering:
              </label>
              <Controller
                name={"thanksgivingOfferingTotal"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={totalAmounts[
                      "thanksgivingOffering"
                    ].toString()}
                    className="border-b border-black text-center mx-1 w-full"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="birthdayOfferingTotal">Birthday Offering:</label>
              <Controller
                name={"birthdayOfferingTotal"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={totalAmounts["birthdayOffering"].toString()}
                    className="border-b border-black text-center mx-1 w-full"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="adultsundayOfferingTotal">
                Adult Sunday Offering:
              </label>
              <Controller
                name={"adultsundayOfferingTotal"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Amount"
                    value={adultsundayOfferingTotal.toString()}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setAdultsundayOfferingTotal(Number(newValue));
                    }}
                    className="border-b border-black text-center mx-1 w-full"
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="childrensundayOfferingTotal">
                Children Sunday Offering:
              </label>
              <Controller
                name={"childrensundayOfferingTotal"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Amount"
                    className="border-b border-black text-center mx-1 w-full"
                    value={childrensundayOfferingTotal.toString()} // Display empty string or number
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setChildrensundayOfferingTotal(Number(newValue));
                    }}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="sundayschoolOfferingTotal">Sunday School:</label>
              <Controller
                name={"sundayschoolOfferingTotal"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Amount"
                    className="border-b border-black text-center mx-1 w-full"
                    value={sundayschoolOfferingTotal.toString()} // Compare after converting to number
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setSundayschoolOfferingTotal(Number(newValue));
                    }}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label htmlFor="total">TOTAL:</label>
              <Controller
                name={"total"}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={totalSummary.toString()}
                    className="border-b border-black text-center mx-1 w-full"
                  />
                )}
              />
            </div>
          </Card>

          <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
            <h1 className="mb-4">CASH COUNT</h1>

            <CashMultiplier
              multipliers={[1000, 500, 200, 100, 50, 20, 10, 5, 1, 0.25]}
            />
          </Card>
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
              <p key={index}>{error?.message}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
