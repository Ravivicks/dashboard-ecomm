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
import { contactFormSchema } from "@/lib/zod-schema";
import { ContactForm } from "./contact-form";
import { useOpenContact } from "@/hooks/use-open-contact";
import { useGetContact } from "./use-single-contact";
import { useEditContact } from "./use-update-contact";

type FormValues = z.input<typeof contactFormSchema>;

const EditContactSheet = () => {
  const { isOpen, onClose, id } = useOpenContact();
  const enquiryQuery = useGetContact(id as string);
  const editMutation = useEditContact(id);

  const onSubmit = (values: FormValues) => {
    const updateData = {
      address: values.address,
      email: values.email,
      workingHours: values.workingHours,
      phone: values.phone,
    };

    editMutation.mutate(updateData, {
      onSuccess: () => onClose(),
    });
  };

  const isLoading = enquiryQuery.isLoading;

  const defaultValue = enquiryQuery.data
    ? {
        address: enquiryQuery.data.address,
        company: enquiryQuery.data.company,
        phone: enquiryQuery.data.phone,
        email: enquiryQuery.data.email,
        workingHours: enquiryQuery.data.workingHours,
      }
    : {
        address: "",
        company: "",
        email: "",
        phone: "",
        workingHours: "",
      };
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Contact</SheetTitle>
            <SheetDescription>Edit an existing Contact</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ContactForm
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

export default EditContactSheet;
