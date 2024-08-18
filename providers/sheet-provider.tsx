"use client";
import BannerDialog from "@/components/BannerDialog";
import EnquireDialog from "@/components/EnquireDialog";
import EditEnquirySheet from "@/features/enquiry/edit-enquiry-sheet";
import BulkProductSheet from "@/features/products/bulk-product-sheet";
import EditProductSheet from "@/features/products/edit-product-sheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <EnquireDialog />
      <BannerDialog />
      <EditProductSheet />
      <EditEnquirySheet />
      <BulkProductSheet />
    </>
  );
};

export default SheetProvider;
