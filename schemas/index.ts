import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const MemberRegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phone: z.string().min(11, { message: "Phone must be at least 11 digits" }),
  address: z.string(),
  age: z.coerce.number().min(2, { message: "Please input your age" }),
  gender: z.string().min(1, { message: "Please select a gender" }),
});

export const FileSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});

export const UploadFormSchema = z.object({
  memberName: z.string().min(3, { message: "Select a member related to the document" }),
  fileName: z.string().min(3, { message: "Enter a file name" }),
  description: z
    .string()
    .min(3, { message: "Describe the file that is being uploaded" }),
  fileUrl: z
    .array(FileSchema)
    .max(3, { message: "You can only add up to 3 images" })
    .min(1, { message: "At least one file must be added." })
});

export const UploadSchema = z.object({
  fileName: z.string().min(3, { message: "Enter a file name" }),
  description: z
    .string()
    .min(3, { message: "Describe the file that is being uploaded" }),
  fileUrl: z
    .string()
    .max(3, { message: "You can only add up to 3 images" })
    .min(1, { message: "At least one file must be added." }),
  fileType: z.string().min(1, { message: "Please select a category" }),
});