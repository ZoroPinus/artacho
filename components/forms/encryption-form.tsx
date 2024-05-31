import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Poppins } from "next/font/google";
import { useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { encrypt } from "node-qpdf2";
import { EncryptionSchema } from "@/schemas";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type FormData = {
  fileUrl: FileList;
  password: string;
};

export default function EncryptionForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(EncryptionSchema),
    defaultValues: {
      fileUrl: undefined,
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = async (data: FormData) => {
    setError("");
    setSuccess("");
    console.log(data);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Upload your files here
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex-grow overflow-y-auto max-w-lg text-left"
      >
        <div className="flex flex-col justify-center items-center">
        <label htmlFor="fileUpload" className="block">
            Choose File:
          </label>
          <Controller
            name="fileUrl"
            control={control}
            rules={{ required: "File URL is required" }} // Add validation rule
            render={({ field }) => (
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => {const files = e.target.files;
                    if (files && files.length > 0) {
                      field.onChange(files[0]);
                    }}} // Change to e.target.files[0] to get the file object
              />
            )}
          />
          <Button
            type="button"
            onClick={() => {
              const fileInput = document.getElementById(
                "fileUpload"
              ) as HTMLInputElement;
              if (fileInput) {
                fileInput.click();
              }
            }}
            className="border-b border-black text-center mx-2"
          >
            Browse
          </Button>
          <span className="text-red-500">
            {/* Display error message for fileUrl field */}
            {errors.fileUrl && errors.fileUrl.message}
          </span>
          <label htmlFor="password" className="block">
            Password:
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password" // Change input type to password for better security
                placeholder="Password"
                className="border-b border-black text-center mx-2"
              />
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
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
