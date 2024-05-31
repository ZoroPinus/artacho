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
  father: z.string().min(1, {
    message: "Name is required",
  }),
  mother: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phone: z.string().min(11, { message: "Phone must be at least 11 digits" }),
  barangay: z.string(),
  cityState: z.string(),
  dob: z.string(),
  province: z.string(),
  age: z.coerce.number().min(2, { message: "Please input your age" }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  idType: z.string().min(1, { message: "Please select an ID type" }),
  id: z.string().min(1, { message: "Please input your ID number" }),
  password: z.string().min(1, { message: "Please input your password" }),
  confirmPassword: z.string().min(1, { message: "Please input your password" }),
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


export const CertificateSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  barangay: z.string().min(1, {
    message: "Barangay is required",
  }),
  date: z.string()
});

export const FinancialStatementSchema = z.object({
  date: z.string().min(1, {
    message: "Date is required",
  }),
  total: z.string(),
  tithesTotal: z.string(),
  thanksgivingOfferingTotal: z.string(),
  birthdayOfferingTotal: z.string(),
  looseOfferingsTotal: z.string(),
  sundayschoolOfferingTotal: z.string(),
  adultsundayOfferingTotal: z.string(),
  childrensundayOfferingTotal: z.string(),
  tithes: z.array(
    z.object({
      title: z.string(),
      amount: z.string(),
    })
  ),
  thanksgivingOffering: z.array(
    z.object({
      title: z.string(),
      amount: z.string(),
    })
  ),
  birthdayOffering: z.array(
    z.object({
      title: z.string(),
      amount: z.string(),
    })
  ),
  others: z.array(
    z.object({
      title: z.string(),
      amount: z.string(),
    })
  ),
  summary: z.array(
    z.object({
      title: z.string(),
      amount: z.string(),
    })
  )
});



export const BaptismCertificateSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  pastorInCharge: z.string().min(1, {
    message: "Name is required",
  }),
  father: z.string().min(1, {
    message: "Father's name is required",
  }),
  mother: z.string().min(1, {
    message: "Mother's name is required",
  }),
  baptismDate: z.string().min(1, {
    message: "Baptism date is required",
  }),
  baptizedBy: z.string().min(1, {
    message: "Name of the person who performed the baptism is required",
  }),
  sponsors: z.array(z.string().min(1, {
    message: "Sponsor name is required",
  })).nonempty({
    message: "At least one sponsor is required",
  }),
  birthDate: z.string().min(1, {
    message: "Birth date is required",
  }),
  birthPlace: z.string().min(1, {
    message: "Birth place is required",
  })
});

export const EncryptionSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "File URL is required",
  }),
  password: z.string().min(1, {
    message: "Barangay is required",
  })
});