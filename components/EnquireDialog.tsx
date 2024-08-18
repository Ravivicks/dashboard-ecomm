"use client";
import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEnquiry } from "@/hooks/use-enquire-open";
import { EnquiryForm } from "./EnquiryForm";
import { useCreateEnquiry } from "@/features/enquiry/use-add-enquiry";
import { formSchema } from "@/lib/zod-schema";
import { useGetProduct } from "@/features/products/use-single-product";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

type FormValues = z.input<typeof formSchema>;

const EnquireDialog = () => {
  const { isOpen, onClose, id } = useEnquiry();
  const mutation = useCreateEnquiry();
  const { user } = useUser();
  const { data: product, isLoading } = useGetProduct(id || "");

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {isLoading ? (
          <div className="flex gap-7 justify-center items-center h-full">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={30}
              height={50}
              className="animate-spin"
            />
            <p>Laoding ...</p>
          </div>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle>Please Confirm Your Details</DialogTitle>
            </DialogHeader>
            {/* <div className="flex justify-between w-full space-x-4"> */}
            <div className="flex gap-2 items-center my-5">
              <Image
                src={product?.image || ""}
                alt={product?.title || ""}
                width={50}
                height={100}
              />
              <div className="flex gap-1 flex-col">
                <p className="text-xs font-semibold">{product?.title}</p>
                <p className="text-xs text-muted-foreground font-semibold">
                  {product?.currency}
                  {product?.currentPrice}
                </p>
              </div>
            </div>
            <div>
              <EnquiryForm
                onSubmit={onSubmit}
                disabled={mutation.isPending}
                defaultValues={{
                  email: user?.emailAddresses[0].emailAddress || "",
                  mobile: "",
                  productId: product?._id || "",
                  productName: product?.title || "",
                  productPrice: product?.lowestPrice || 0,
                  enquiryDescription: "",
                  quantity: 1,
                }}
              />
            </div>
          </div>
          // </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnquireDialog;
