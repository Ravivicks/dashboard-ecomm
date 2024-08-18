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

const BulkProductSheet = () => {
  const { isOpen, onClose } = useOpenBulkProduct();

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          className="space-y-4 overflow-y-auto w-[1000px]"
          side="bottom"
        >
          <SheetHeader>
            <SheetTitle>Add Bulk Product</SheetTitle>
            <SheetDescription>Add Bulk Products By excel</SheetDescription>
          </SheetHeader>
          <ProductTable />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BulkProductSheet;
