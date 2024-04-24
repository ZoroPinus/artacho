"use client";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import FileUpload from "../file-upload";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { uploadDocument } from "@/actions/document";
import { UploadFormSchema } from "@/schemas";
import { UploadButton, UploadDropzone } from "../uploadthing";
import { members } from "@/actions/members";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
type UploadFormValues = z.infer<typeof UploadFormSchema>;

interface UploadFormProps {
  initialData: any | null;
  categories: any;
}

export const UploadDocumentForm: React.FC<UploadFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Document" : "Upload Document";
  const description = initialData ? "Edit a Document." : "Add a new Document";
  const toastMessage = initialData ? "Document updated." : "Document uploaded.";
  const action = initialData ? "Save changes" : "Upload";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [memberData, setMembers] = useState<User[]>([]);
  const { data: session } = useSession();

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        price: 0,
        fileUrl: [],
        category: "",
      };

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(UploadFormSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof UploadFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      uploadDocument(values).then((data) => {
        setError(data?.error);
        if (data?.success) {
          form.reset();
          setSuccess(data?.success);
        }
      });
    });
  };

  const fetchMembers = async () => {
    if (session!.user!.role! == UserRole.ADMIN) {
      members().then((res) => {
        // @ts-ignore
        setMembers(res);
        console.log(res);
      });
    }else{
      const memberName:User[] = [
        {
          address: "Sample Address",
          id: session!.user!.id!,
          name: session!.user!.name!,
          role: session!.user!.role!, // Assuming UserRole.USER is appropriate
          email: "sample@example.com",
          gender: "Male", // Or "Female" or any other appropriate value
          phone: "1234567890",
          age: 30,
          createdAt:""
      }
      ]
      setMembers(memberName);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={field.onChange}
                      value={field.value}
                      onRemove={field.onChange}
                      uploadType={"imageUploader"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documents</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={field.onChange}
                      value={field.value}
                      onRemove={field.onChange}
                      uploadType={"pdfUploader"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="memberName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member Name</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select the member whose document is to be uploaded"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {memberData.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter an appropriate file name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Tell something about this file"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
