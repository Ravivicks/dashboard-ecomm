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
import { UpdateProductLocaleProps, UpdateProductProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useUpdateBulkProduct } from "@/features/products/use-update-bulk-product";
import { useOpenBulkProductUpdate } from "@/hooks/use-open-bulk-update-by-excel";
import { useUpdateBulkProductLocale } from "@/features/products/use-update-bulk-product-locale";
import { useOpenBulkProductLocaleUpdate } from "@/hooks/use-open-bulk-locale-update";

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

export default function UpdateProductLocale() {
  const mutation = useUpdateBulkProductLocale();
  const { user } = useUser();
  const { onClose } = useOpenBulkProductLocaleUpdate();

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
        const json: UpdateProductLocaleProps[] = XLSX.utils.sheet_to_json(
          workSheet
        ) as UpdateProductLocaleProps[];

        const sameProduct = json.map((product) => ({
          _id: product._id,
          title: product.titlespanish,
          description: product["description spanish"],
          productDescription: product.productDescriptionspanish,
          currency: product.currency,
        }));

        const plainProduct = JSON.parse(JSON.stringify(sameProduct));
        try {
          if (plainProduct) {
            // Assuming you're using a mutation hook here
            mutation.mutate(plainProduct, {
              onSuccess: () => {
                onClose();
              },
            });
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
                  className="rounded-xl w-full"
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
          Update Products
        </Button>

        {/* </CardContent>
        </Card> */}
      </form>
    </Form>
  );
}
