import React from "react";
import { z } from "zod";
import { formBannerFileSchema } from "@/lib/zod-schema";
import { useNewBannerFileOpen } from "@/hooks/use-banner-file-open";
import { useCreatePartnerBanner } from "./use-create-banner";
import { BannerFileForm } from "./banner-file-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type FormValues = z.infer<typeof formBannerFileSchema>;

const NewBannerFileSheet = () => {
  const { isOpen, onClose } = useNewBannerFileOpen();
  const mutation = useCreatePartnerBanner();

  const onSubmit = (values: FormValues & { file?: File }) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("title", values.title);

    // Handle the optional file
    if (values.file) {
      formData.append("image", values.file);
    }

    // Trigger mutation with FormData
    mutation.mutate(formData, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Banner</SheetTitle>
          <SheetDescription>Add a new Banner</SheetDescription>
        </SheetHeader>
        <BannerFileForm
          onSubmit={onSubmit}
          disabled={false}
          defaultValues={{
            title: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewBannerFileSheet;
