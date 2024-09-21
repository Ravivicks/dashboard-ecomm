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
import { orderFormSchema } from "@/lib/zod-schema";
import { useSlideOpen } from "@/hooks/use-slide-open";
import { useOpenOrder } from "@/hooks/use-open-order";
import { useEditorder } from "./use-update-order";
import { useGetOrder } from "./use-single-order";
import { OrderForm } from "./edit-order-form";

type FormValues = z.infer<typeof orderFormSchema>; // Use z.infer for accurate type

const EditOrderSheet = () => {
  const { isOpen, onClose, id } = useOpenOrder();
  const productQuery = useGetOrder(id as string);
  const editMutation = useEditorder(id);

  const onSubmit = (values: FormValues) => {
    const updateData = {
      status: values.status ?? "",
    };

    editMutation.mutate(updateData, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error("Error updating order:", error);
      },
    });
  };

  const isLoading = productQuery.isLoading;

  const defaultValue: FormValues = productQuery.data
    ? {
        userId: productQuery.data.userId,
        orderId: productQuery.data.orderId,
        status: productQuery.data.status,
      }
    : {
        userId: "",
        orderId: "",
        status: "",
      };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Order</SheetTitle>
          <SheetDescription>Edit an existing Order</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <OrderForm
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

export default EditOrderSheet;
