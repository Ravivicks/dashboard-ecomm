"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetEnquiries } from "@/features/enquiry/use-get-enquries";
import { Skeleton } from "@/components/ui/skeleton";

const Account = () => {
  const { data, isPending } = useGetEnquiries();
  const [selectedType, setSelectedType] = React.useState<string | null>(
    "quickQuote"
  );

  const handleSelectChange = (value: string | null) => {
    setSelectedType(value);
  };

  const enquiryTypeOptions = [
    { value: "all", label: "All Enquiries" }, // Ensure "all" is a valid string
    { value: "cart", label: "Cart" },
    { value: "priceRequest", label: "Price Request" },
    { value: "quickQuote", label: "Quick Quote" },
    { value: "quoteRequest", label: "Quote Request" },
    { value: "serviceQuote", label: "Service Quote" },
    { value: "entireProjectQuote", label: "Entire Project Quote" },
    { value: "contactQuery", label: "Contact Enquiry" },
  ];

  // Filter data based on selected enquiryType
  const filteredData =
    selectedType && selectedType !== "all"
      ? data?.filter((enquiry) => enquiry.enquiryType === selectedType)
      : data;

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
          <CardTitle className="text-xl line-clamp-1">Enquiry Page</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredData || []}
            filterKey="email"
            disable={false}
            selectOptions={enquiryTypeOptions}
            selectedValue={selectedType}
            onSelectChange={handleSelectChange} // This now accepts string | null
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
