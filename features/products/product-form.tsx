import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { productFormSchema } from "@/lib/zod-schema";
import { Trash } from "lucide-react";
import FieldArrayComponent from "@/components/FieldArray";

type FormValues = z.infer<typeof productFormSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const ProductForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
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
        {/* Title Field */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  disabled={disabled}
                  placeholder="Product title"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Price Field */}
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Price" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Discount Field */}
        <FormField
          name="discount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Discount" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Image Field */}
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Image Url" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Slider Images Field */}
        <div>
          <FieldArrayComponent control={form.control} />
        </div>

        {/* Submit Button */}
        <Button className="w-full" disabled={disabled}>
          Update Product
        </Button>
      </form>
    </Form>
  );
};
