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
import { reviewFormSchema } from "@/lib/zod-schema";
import { ReviewForm } from "./edit-review-form";
import { useGetReview } from "./use-get-review";
import { useUpdateReview } from "./use-update-review";
import { useOpenReview } from "@/hooks/use-open-review";

type FormValues = z.infer<typeof reviewFormSchema>; // Use z.infer for accurate type

const EditReviewSheet = () => {
  const { isOpen, onClose, id } = useOpenReview();
  const reviewQuery = useGetReview(id as string);
  const editMutation = useUpdateReview(id);

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

  const defaultValue: FormValues = reviewQuery.data
    ? {
        userId: reviewQuery.data?.userId,
        firstName: reviewQuery.data?.firstName || "",
        lastName: reviewQuery.data?.lastName || "",
        comment: reviewQuery.data?.comment,
        status: reviewQuery.data.status,
      }
    : {
        userId: "",
        firstName: "",
        lastName: "",
        comment: "",
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
          <SheetTitle>Edit Review</SheetTitle>
          <SheetDescription>Edit an existing Review</SheetDescription>
        </SheetHeader>
        {reviewQuery.isPending ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <ReviewForm
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

export default EditReviewSheet;
