"use client";
import { deleteDocument } from "@/actions/document";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Document } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
interface CellActionProps {
  data: Document;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      // Fetch the file data from the URL
      const response = await fetch(data.fileUrl);
      const blob = await response.blob();

      // Create a blob URL for the file data
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const tempLink = document.createElement("a");
      tempLink.href = blobUrl;
      tempLink.setAttribute("download", "downloaded-file"); // Set the desired file name

      // Append the link to the body and click it to start the download
      document.body.appendChild(tempLink);
      tempLink.click();

      // Remove the temporary link element
      document.body.removeChild(tempLink);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Handle error if needed
    }
  };
  
  const onDelete = async () => {
    // const res = await deleteDocument(data.id);
    // console.log(data.id)
    // if (res.success) {
    //   console.log('Success')
    // } else if (res.success) {
    //   console.log('Error')
    // }else{

    // }

    try {
      const res = await deleteDocument(data.id);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const handleDocuments = async () => {

  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          
          <DropdownMenuItem onClick={() => handleDownload()}>
            <Edit className="mr-2 h-4 w-4" /> Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/documents/upload`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete()}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
