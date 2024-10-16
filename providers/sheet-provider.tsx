"use client";
import BannerDialog from "@/components/BannerDialog";
import EditBannerSheet from "@/features/bannerFile/edit-banner-sheet";
import NewBannerFileSheet from "@/features/bannerFile/new-banner-sheet";
import EditOrderSheet from "@/features/checkout/edit-order-sheet";
import EditContactSheet from "@/features/contact/edit-contact-sheet";
import NewContactSheet from "@/features/contact/new-contact-sheet";
import EditEnquirySheet from "@/features/enquiry/edit-enquiry-sheet";
import BulkProductSheet from "@/features/products/bulk-product-sheet";
import ProductUpdateDialog from "@/features/products/bulk-product-update-dialog";
import BulkProductUpdateLocaleSheet from "@/features/products/bulk-update-locale-sheet";
import BulkProductUpdateSheet from "@/features/products/bulk-update-sheet";
import EditProductSheet from "@/features/products/edit-product-sheet";
import EditReviewSheet from "@/features/review/edit-review-sheet";
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
      <ProductUpdateDialog />
      <BulkProductUpdateSheet />
      <EditOrderSheet />
      <EditReviewSheet />
      <BulkProductUpdateLocaleSheet />
    </>
  );
};

export default SheetProvider;
