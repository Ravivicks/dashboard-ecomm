"use client";
import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formBannerSchema } from "@/lib/zod-schema";
import { useBannerOpen } from "@/hooks/use-banner-open";
import { useCreatePartnerBanner } from "@/features/products/use-create-partner-banner";
import { BannerForm } from "./BannerForm";

type FormValues = z.input<typeof formBannerSchema>;

const BannerDialog = () => {
  const { isOpen, onClose } = useBannerOpen();
  const mutation = useCreatePartnerBanner();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <DialogHeader>
            <DialogTitle>Partner Banner Form</DialogTitle>
          </DialogHeader>

          <BannerForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{
              image: "",
              brand: "",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BannerDialog;
