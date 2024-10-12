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
import { useOpenProduct } from "@/hooks/use-open-product";
import { productFormSchema } from "@/lib/zod-schema";
import { ProductForm } from "./product-form";
import { useGetProduct } from "./use-single-product";
import { useEditProduct } from "./use-update-product";
import { useSlideOpen } from "@/hooks/use-slide-open";

type FormValues = z.infer<typeof productFormSchema>; // Use z.infer for accurate type

const EditProductSheet = () => {
  const { isOpen, onClose, id } = useOpenProduct();
  const { onClose: slideClose } = useSlideOpen();
  const productQuery = useGetProduct(id as string);
  const editMutation = useEditProduct(id);

  const onSubmit = (values: FormValues) => {
    const updateData = {
      title: values.title,
      discount: values.discount,
      lowestPrice: values.price,
      image: values.image,
      sliderImages: values.sliderImages,
      quantity: Number(values.quantity),
      minQuantity: Number(values.minQuantity),
      category: values.category,
      machineCode: values.machineCode,
      type: values.type,
      subCategory: values.subCategory,
    };

    editMutation.mutate(updateData, {
      onSuccess: () => {
        onClose();
        slideClose();
      },
    });
  };

  const isLoading = productQuery.isLoading;

  const defaultValue: FormValues = productQuery.data
    ? {
        title: productQuery.data.title,
        discount: productQuery.data.discount,
        price: productQuery.data.lowestPrice,
        image: productQuery.data.image,
        sliderImages: productQuery.data.sliderImages || [""],
        quantity: productQuery.data.quantity,
        minQuantity: productQuery.data.minQuantity,
        category: productQuery.data.category,
        machineCode: productQuery.data.machineCode,
        type: productQuery.data.type,
        subCategory: productQuery.data.subCategory,
      }
    : {
        title: "",
        discount: "",
        price: 0,
        image: "",
        sliderImages: [""],
        quantity: 1,
        minQuantity: 1,
        category: "",
        machineCode: "",
        type: "",
        subCategory: "",
      };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        onClose();
        slideClose();
      }}
    >
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
          <ProductForm
            id={id}
            onSubmit={onSubmit}
            disabled={false}
            defaultValues={defaultValue}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditProductSheet;
