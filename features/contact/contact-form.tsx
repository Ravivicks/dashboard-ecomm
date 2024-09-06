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
} from "@/components/ui/form";

import { contactFormSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";

type FormValues = z.input<typeof contactFormSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const ContactForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
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
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Company Name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder="Address"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="mobile" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="workingHours"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working Hours</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Working Hours"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {!id ? "Add Contact" : "Update Contact"}
        </Button>
      </form>
    </Form>
  );
};
