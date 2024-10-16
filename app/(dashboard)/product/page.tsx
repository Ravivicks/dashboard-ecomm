"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetProducts } from "@/features/products/use-get-products";
import { Skeleton } from "@/components/ui/skeleton";
import { useOpenBulkProduct } from "@/hooks/use-open-bulk-product";
import { useUpdateDialogOpen } from "@/hooks/use-product-open";
import { useOpenBulkProductUpdate } from "@/hooks/use-open-bulk-update-by-excel";
import { useOpenBulkProductLocaleUpdate } from "@/hooks/use-open-bulk-locale-update";

const Account = () => {
  const { data, isPending } = useGetProducts();
  const { onOpen } = useOpenBulkProduct();
  const { onOpen: updateOpen } = useUpdateDialogOpen();
  const { onOpen: updateBulkOpen } = useOpenBulkProductUpdate();
  const { onOpen: updateBulkLocaleOpen } = useOpenBulkProductLocaleUpdate();

  if (isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <Skeleton className="size-14 h-6 w-20" />
          </CardHeader>
          <CardContent>
            <div>
              <Skeleton className="shrink-0 h-12 w-1/3 mb-2" />
              <Skeleton className="shrink-0 h-12 w-full mb-2" />
              <div className="flex gap-4">
                <Skeleton className="shrink-0 h-5 w-12 flex-grow" />
                <Skeleton className="shrink-0 h-5 w-12 flex-grow" />
                <Skeleton className="shrink-0 h-5 w-12 flex-grow" />
                <Skeleton className="shrink-0 h-5 w-12 flex-grow" />
                <Skeleton className="shrink-0 h-5 w-12 flex-grow" />
                <Skeleton className="shrink-0 h-5 w-12 flex-grow" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <div>
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">Product Page</CardTitle>
            <div className="flex gap-2 md:flex-row flex-col">
              <Button size={"sm"} onClick={onOpen}>
                <Plus className="size-4 mr-2" />
                Upload Bulk Product
              </Button>
              <Button size="sm" onClick={updateBulkOpen}>
                <Edit2 className="size-4 mr-2" /> Update Bulk Product
              </Button>
              {/* <Button size="sm" onClick={updateBulkLocaleOpen}>
                <Edit2 className="size-4 mr-2" /> Update Bulk Product Locale
              </Button> */}
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data || []}
              filterKey="category"
              disable={false}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Account;
