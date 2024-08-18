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
import { formBannerSchema } from "@/lib/zod-schema";

type FormValues = z.input<typeof formBannerSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const BannerForm = ({ onSubmit, defaultValues, disabled }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formBannerSchema),
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
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Link</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl"
                  disabled={disabled}
                  placeholder="Please enter your image link"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="brand"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl"
                    disabled={disabled}
                    placeholder="Please enter Brand Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  {`Brand Name like "Schneider Electric" as per you xlsx file
                  brand column`}
                </FormDescription>
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
