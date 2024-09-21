"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { enquiryFormSchema } from "@/lib/zod-schema";
import { EnquiryForm } from "./enquiry-form";
import { useGetEnquiry } from "./use-single-enquiry";
import { useEditEnquiry } from "./use-update-enquiry";
import { useOpenEnquiry } from "@/hooks/use-open-enquiry";
import { Button } from "@/components/ui/button";

type FormValues = z.infer<typeof enquiryFormSchema>;

const EditEnquirySheet = () => {
  const { isOpen, onClose, id } = useOpenEnquiry();
  const enquiryQuery = useGetEnquiry(id as string);
  const editMutation = useEditEnquiry(id);

  const onSubmit = (values: FormValues) => {
    const updateData = {
      quantity: values.quantity ?? 0,
      status: values.status,
      reason: values.reason ?? "",
    };

    editMutation.mutate(updateData, {
      onSuccess: () => onClose(),
    });
  };

  const isLoading = enquiryQuery.isLoading;

  const defaultValue = enquiryQuery.data
    ? {
        productName: enquiryQuery.data.productName || "",
        productPrice: enquiryQuery.data.productPrice ?? 0,
        email: enquiryQuery.data.email || "",
        mobile: enquiryQuery.data.mobile || "",
        quantity: enquiryQuery.data.quantity ?? 0,
        status: enquiryQuery.data.status || "",
        reason: enquiryQuery.data.reason ?? "",
      }
    : {
        productName: "",
        productPrice: 0,
        email: "",
        mobile: "",
        quantity: 0,
        status: "",
        reason: "",
      };

  const [showMore, setShowMore] = useState(false);

  const renderProductDetails = () => {
    const { enquiryType, cartProduct, productName, productPrice } =
      enquiryQuery.data || {};

    if (enquiryType === "cart") {
      return (
        <div className="space-y-2">
          <h4 className="font-semibold">Product Details:</h4>
          {cartProduct && cartProduct.length > 0 && (
            <>
              <div className="text-xs space-y-2">
                <p>
                  <strong>Name:</strong> {cartProduct[0].productName}
                </p>
                <div className="flex gap-4">
                  <p>
                    <strong>Price:</strong> ${cartProduct[0].productPrice}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {cartProduct[0].quantity}
                  </p>
                </div>
              </div>
              {showMore && (
                <>
                  {cartProduct.slice(1).map((product, index) => (
                    <div key={index} className="text-xs space-y-2">
                      <hr />
                      <p>
                        <strong>Name:</strong> {product.productName}
                      </p>
                      <div className="flex gap-4">
                        <p>
                          <strong>Price:</strong> {product.productPrice}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {product.quantity}
                        </p>
                      </div>
                      {/* {index < cartProduct.length - 1 && <hr />}{" "} */}
                      {/* Separator between products */}
                    </div>
                  ))}
                </>
              )}
              <Button
                variant="link"
                onClick={() => setShowMore((prev) => !prev)}
                className="text-xs p-0"
              >
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </>
          )}
        </div>
      );
    }

    if (enquiryType === "priceRequest" || enquiryType === "quoteRequest") {
      return (
        <div className="space-y-2 text-xs">
          <h4 className="font-semibold">Product Details:</h4>
          <p>
            <strong>Name:</strong> {productName}
          </p>
          <p>
            <strong>Price:</strong> {productPrice}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Enquiry</SheetTitle>
          <SheetDescription>Edit an existing enquiry</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <>
            {renderProductDetails()}
            <EnquiryForm
              id={id}
              onSubmit={onSubmit}
              disabled={false}
              defaultValues={defaultValue}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditEnquirySheet;
