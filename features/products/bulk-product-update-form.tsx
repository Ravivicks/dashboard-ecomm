"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { productUpdateFormSchema } from "@/lib/zod-schema";

type FormValues = z.input<typeof productUpdateFormSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const ProductUpdateForm = ({
  onSubmit,
  defaultValues,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(productUpdateFormSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="productCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Code</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl"
                  disabled={disabled}
                  placeholder="Please enter your product code"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Category for updation</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl"
                    disabled={disabled}
                    placeholder="Please enter category name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Total Quantity</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl"
                    disabled={disabled}
                    placeholder="Please enter quantity"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value)); // Allow empty string, convert to number otherwise
                    }}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button
          className="w-full rounded-xl"
          disabled={disabled}
          variant="destructive"
        >
          {disabled ? "Submitting......" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
