import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { formBannerFileSchema } from "@/lib/zod-schema";
import { BannerFileForm } from "./banner-file-form";
import { useOpenEditBanner } from "@/hooks/use-banner-edit-open";
import { useGetBanner } from "./use-get-banner";
import { useEditPartnerBanner } from "./use-edit-banner";

type FormValues = z.input<typeof formBannerFileSchema>;

const EditBannerSheet = () => {
  const { isOpen, onClose, id } = useOpenEditBanner();
  const bannerQuery = useGetBanner(id as string);
  const editMutation = useEditPartnerBanner(id);

  const onSubmit = (values: FormValues & { file?: File }) => {
    const formData = new FormData();

    formData.append("title", values.title);

    if (values.file) {
      formData.append("image", values.file);
    }

    editMutation.mutate(formData, {
      onSuccess: () => onClose(),
    });
  };

  const isLoading = bannerQuery.isLoading;

  const defaultValue = bannerQuery.data
    ? {
        title: bannerQuery.data.title,
        file: undefined, // Placeholder, handle file input in the form
      }
    : {
        title: "",
        file: undefined, // Placeholder for a new banner
      };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Banner</SheetTitle>
          <SheetDescription>Edit an existing banner</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <BannerFileForm
            id={id}
            onSubmit={onSubmit}
            disabled={editMutation.isPending}
            defaultValues={defaultValue}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditBannerSheet;
