import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import ProductTable from "@/components/ProductsTable";
import { useOpenBulkProduct } from "@/hooks/use-open-bulk-product";
import { useOpenBulkProductUpdate } from "@/hooks/use-open-bulk-update-by-excel";
import UpdateProduct from "@/components/UpdateProduct";
import UpdateProductLocale from "@/components/UpdateProductLocale";
import { useOpenBulkProductLocaleUpdate } from "@/hooks/use-open-bulk-locale-update";

const BulkProductUpdateLocaleSheet = () => {
  const { isOpen, onClose } = useOpenBulkProductLocaleUpdate();

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 overflow-auto w-[1000px]">
          <SheetHeader>
            <SheetTitle>Update Bulk Product As Per Locale</SheetTitle>
            <SheetDescription>Update Bulk Products By excel</SheetDescription>
          </SheetHeader>
          <UpdateProductLocale />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BulkProductUpdateLocaleSheet;
