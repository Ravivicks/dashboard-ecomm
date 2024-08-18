"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "./PhoneInput";

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const EnquiryForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: FormValues) => {
    console.log(values);

    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl"
                  disabled={disabled}
                  placeholder="Please enter you email"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full">
          <FormField
            name="mobile"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <PhoneInput className="rounded-xl" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl"
                    disabled={disabled}
                    placeholder="Please provide quantity"
                    type="number"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="enquiryDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enquiry Description</FormLabel>
              <FormControl>
                <Textarea
                  className="rounded-xl"
                  disabled={disabled}
                  placeholder="Please enter Detail description of your enquiry"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="w-full rounded-xl"
          disabled={disabled}
          variant="destructive"
        >
          {id ? "Submitting......" : "Submit your request"}
        </Button>
      </form>
    </Form>
  );
};
