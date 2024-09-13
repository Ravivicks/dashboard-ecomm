"use client";
import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { productUpdateFormSchema } from "@/lib/zod-schema";
import { useBannerOpen } from "@/hooks/use-banner-open";
import { ProductUpdateForm } from "./bulk-product-update-form";
import { useEditProductCategoryAndQuantity } from "./use-update-category-quantity";
import { useUpdateDialogOpen } from "@/hooks/use-product-open";

type FormValues = z.input<typeof productUpdateFormSchema>;

const ProductUpdateDialog = () => {
  const { isOpen, onClose } = useUpdateDialogOpen();
  const mutation = useEditProductCategoryAndQuantity();

  const onSubmit = (values: FormValues) => {
    // Call the mutation with productCode, category, and quantity from the form values
    mutation.mutate(
      {
        productCode: values.productCode,
        category: values.category,
        quantity: values.quantity,
      },
      {
        onSuccess: () => {
          onClose(); // Close the dialog on success
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <DialogHeader>
            <DialogTitle>Bulk Update Product</DialogTitle>
          </DialogHeader>

          <ProductUpdateForm
            onSubmit={onSubmit}
            disabled={mutation.isPending} // Disable form while mutation is pending
            defaultValues={{
              productCode: "",
              category: "",
              quantity: 1,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUpdateDialog;
