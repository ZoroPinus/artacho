"use client";
import React, { useEffect } from "react";
import { Controller, Control } from "react-hook-form";
import { Card } from "./ui/card";

interface SummaryCardProps {
  control: Control<any>;
  totalAmounts: Record<string, string>;
  adultOfferings: string;
  setAdultOfferings: React.Dispatch<React.SetStateAction<string>>; // Correct type for setter
  childrenOfferings: string;
  setChildrenOfferings: React.Dispatch<React.SetStateAction<string>>; // Correct type for setter
  sundaySchool: string;
  setSundaySchool: React.Dispatch<React.SetStateAction<string>>; // Correct type for setter
  totalSummary: number;
  setTotalSummary: React.Dispatch<React.SetStateAction<number>>; // Correct type for setter
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  control,
  totalAmounts,
  adultOfferings,
  childrenOfferings,
  sundaySchool,
  totalSummary,
}) => {
 

  return (
    <Card className="border-black rounded-lg text-center w-full p-4 mb-4">
      <h1 className="mb-4">SUMMARY</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="looseOfferingsTotal">Loose Offerings:</label>
        <Controller
          name="looseOfferingsTotal"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={totalAmounts["others"]}
              className="border-b border-black text-center mx-1 w-full"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="tithesTotal">Tithes and Pledges:</label>
        <Controller
          name="tithesTotal"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={totalAmounts["tithes"]}
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
          name="thanksgivingOfferingTotal"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={totalAmounts["thanksgivingOffering"]}
              className="border-b border-black text-center mx-1 w-full"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="birthdayOfferingTotal">Birthday Offering:</label>
        <Controller
          name="birthdayOfferingTotal"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={totalAmounts["birthdayOffering"]}
              className="border-b border-black text-center mx-1 w-full"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="adultsundayOfferingTotal">Adult Sunday Offering:</label>
        <Controller
          name="adultsundayOfferingTotal"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={adultOfferings}
             
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
          name="childrensundayOfferingTotal"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={childrenOfferings}
              
              className="border-b border-black text-center mx-1 w-full"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="sundayschoolOfferingTotal">Sunday School:</label>
        <Controller
          name="sundayschoolOfferingTotal"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder={sundaySchool}
              className="border-b border-black text-center mx-1 w-full"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="total">TOTAL:</label>
        <Controller
          name="total"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder={totalSummary.toString()}
              className="border-b border-black text-center mx-1 w-full"
            />
          )}
        />
      </div>
    </Card>
  );
};

export default SummaryCard;
