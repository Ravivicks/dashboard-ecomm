"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewBannerFileOpen } from "@/hooks/use-banner-file-open";
import { useGetBanners } from "@/features/bannerFile/use-get-banners";

const Account = () => {
  const { data, isPending } = useGetBanners();
  const { onOpen } = useNewBannerFileOpen();

  if (isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="h-6 w-32" />
            </CardTitle>
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
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Banner Details Page
          </CardTitle>
          <Button size={"sm"} onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Add New Banner
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data || []}
            filterKey="title"
            disable={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
