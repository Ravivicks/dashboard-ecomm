import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { z } from "zod";
import { contactFormSchema } from "@/lib/zod-schema";
import { ContactForm } from "./contact-form";
import { useNewContactOpen } from "@/hooks/use-new-contact";
import { useCreateContact } from "./use-add-contact";

type FormValues = z.input<typeof contactFormSchema>;

const NewContactSheet = () => {
  const { isOpen, onClose } = useNewContactOpen();

  const mutation = useCreateContact();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>New Contact</SheetTitle>
            <SheetDescription>Add a new Contact</SheetDescription>
          </SheetHeader>
          <ContactForm
            onSubmit={onSubmit}
            disabled={false}
            defaultValues={{
              address: "",
              company: "",
              email: "",
              phone: "",
              workingHours: "",
            }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NewContactSheet;
