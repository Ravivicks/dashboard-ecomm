"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductProps } from "@/types";
import { useCreateBulkProduct } from "@/features/products/use-bulk-products";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useBannerOpen } from "@/hooks/use-banner-open";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        file &&
        (file.type === "application/vnd.ms-excel" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
      {
        message: "File must be in .xlsx or .xls format.",
      }
    ),
});

export default function ProductTable() {
  const mutation = useCreateBulkProduct();
  const { user } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.fullName || "Guest User",
      file: undefined,
    },
  });

  function onSubmit(
    data: z.infer<typeof FormSchema>,
    event?: React.FormEvent<HTMLFormElement>
  ) {
    event?.preventDefault(); // Prevent the default form submission behavior

    const file = data.file;
    if (file) {
      saveData(file); // Pass the file to saveData function
    }
  }

  function saveData(file: File) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const json: ProductProps[] = XLSX.utils.sheet_to_json(
          workSheet
        ) as ProductProps[];

        const sameProduct = json.map((product) => ({
          url: product.References,
          currency: "₹",
          image: product["Image Link-"] || "/images/no-product.jpg",
          pdfFile: product.PDP,
          title: product["Medium description"] || "No title found in xlsx",
          discount: "0",
          brand: product.Brand || "no brand",
          category: product["Product Line Name"] || "",
          currentPrice: product.LP || 0,
          originalPrice: product.LP || 0,
          priceHistory: [],
          productInformationTech: [],
          productInformationAdditional: [],
          highestPrice: product.LP || 0,
          lowestPrice: product.LP || 0,
          averagePrice: product.LP || 0,
          discountRate: 0,
          description: product["Long Description"] || "",
          productDescription: product["Medium description"] || "",
          reviewsCount: 100,
          stars: 4.5,
          isOutOfStock: false,
        }));

        const plainProduct = JSON.parse(JSON.stringify(sameProduct));
        try {
          if (plainProduct) {
            // Assuming you're using a mutation hook here
            mutation.mutate(plainProduct);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    reader.readAsBinaryString(file);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit((data) => onSubmit(data, e))(e);
        }}
        className="space-y-6"
      >
        {/* <Card className="my-10 rounded-xl">
          <CardHeader className="font-bold bg-destructive/5">
            <div className="flex justify-between">
              <p>Bulk Upload Product Here</p>
            </div>
          </CardHeader>
          <CardContent> */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl w-full md:w-1/3"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Please upload an Excel file.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="destructive"
          className="my-8 rounded-xl"
          disabled={mutation.isPending}
        >
          Save Data To DB
        </Button>

        <div className="p-4">
          <h1 className="text-xl font-bold">
            Instruction For Uploading Bulk Product
          </h1>
          <ul className="font-semibold text-lg text-muted-foreground list-decimal">
            <li className="mt-2">
              File should be .xlsx and .xls only. other file not to be uploaded.
            </li>
            <li className="mt-2">Format of file is:</li>
            <table className="border">
              <thead className="text-xs">
                <tr>
                  <th className="border p-2">References</th>
                  <th className="border p-2">Image Link-</th>
                  <th className="border p-2">360 Image Link</th>
                  <th className="border p-2">Short Description</th>
                  <th className="border p-2">Medium description</th>
                  <th className="border p-2">Long Description</th>
                  <th className="border p-2">Product Line Helios Code</th>
                  <th className="border p-2">Product Line Name</th>
                  <th className="border p-2">Brand</th>
                  <th className="border p-2">EAN13</th>
                  <th className="border p-2">GTIN</th>
                  <th className="border p-2">keywords</th>
                  <th className="border p-2">LP</th>
                  <th className="border p-2">PDP</th>
                  <th className="border p-2">Catalogues</th>
                </tr>
              </thead>
            </table>
            <li className="mt-2">
              The xlsx file should have some mandate column :
            </li>
            <ul className="font-semibold text-xs text-muted-foreground list-disc ml-5">
              <li>{`Product image (column name in excel is "Image Link-")`}</li>
              <li>
                {`Product title (column name in excel is "Medium description")`}
              </li>
              <li>Product Currency</li>
              <li>Product Reference</li>
              <li>Product discount</li>
            </ul>
          </ul>
        </div>
        {/* </CardContent>
        </Card> */}
      </form>
    </Form>
  );
}
