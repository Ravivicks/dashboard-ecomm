"use client";
import BannerDialog from "@/components/BannerDialog";
import EditBannerSheet from "@/features/bannerFile/edit-banner-sheet";
import NewBannerFileSheet from "@/features/bannerFile/new-banner-sheet";
import EditContactSheet from "@/features/contact/edit-contact-sheet";
import NewContactSheet from "@/features/contact/new-contact-sheet";
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
      <BannerDialog />
      <EditProductSheet />
      <EditEnquirySheet />
      <BulkProductSheet />
      <EditContactSheet />
      <NewContactSheet />
      <NewBannerFileSheet />
      <EditBannerSheet />
    </>
  );
};

export default SheetProvider;
