import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { enquiryFormSchema } from "@/lib/zod-schema";
import { EnquiryForm } from "./enquiry-form";
import { useGetEnquiry } from "./use-single-enquiry";
import { useEditEnquiry } from "./use-update-enquiry";
import { useOpenEnquiry } from "@/hooks/use-open-enquiry";

type FormValues = z.input<typeof enquiryFormSchema>;

const EditEnquirySheet = () => {
  const { isOpen, onClose, id } = useOpenEnquiry();
  const enquiryQuery = useGetEnquiry(id as string);
  const editMutation = useEditEnquiry(id);

  const onSubmit = (values: FormValues) => {
    const updateData = {
      quantity: values.quantity,
      status: values.status,
      reason: values.reason,
    };

    editMutation.mutate(updateData, {
      onSuccess: () => onClose(),
    });
  };

  const isLoading = enquiryQuery.isLoading;

  const defaultValue = enquiryQuery.data
    ? {
        productName: enquiryQuery.data.productName,
        productPrice: enquiryQuery.data.productPrice,
        email: enquiryQuery.data.email,
        mobile: enquiryQuery.data.mobile,
        quantity: enquiryQuery.data.quantity,
        status: enquiryQuery.data.status,
        reason: enquiryQuery.data.reason,
      }
    : {
        productName: "",
        productPrice: 0,
        email: "",
        mobile: "",
        quantity: 0,
        reason: "",
        status: "",
      };
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>Edit an existing Product</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <EnquiryForm
              id={id}
              onSubmit={onSubmit}
              disabled={false}
              defaultValues={defaultValue}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditEnquirySheet;
