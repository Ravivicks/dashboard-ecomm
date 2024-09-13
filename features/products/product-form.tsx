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
import { Plus, Trash } from "lucide-react";
import FieldArrayComponent from "@/components/FieldArray";
import { useSlideOpen } from "@/hooks/use-slide-open";

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
  const { isOpen, onOpen } = useSlideOpen();

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
                  // readOnly
                  disabled={disabled}
                  placeholder="Product title"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            name="machineCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Code</FormLabel>
                <FormControl>
                  <Input
                    // readOnly
                    disabled={disabled}
                    placeholder="Product Code"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Product Category"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          {/* Price Field */}
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Price"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value)); // Allow empty string, convert to number otherwise
                    }}
                  />
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
                  <Input
                    disabled={disabled}
                    placeholder="Discount"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          {/* Price Field */}
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Quantity</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Enter Total Quantity"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value)); // Allow empty string, convert to number otherwise
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Discount Field */}
          <FormField
            name="minQuantity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min. Quantity</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Enter Minimum Quantity"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value)); // Allow empty string, convert to number otherwise
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Product Type"
                  {...field}
                />
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
              <div className="flex justify-between items-center">
                <FormLabel>Image</FormLabel>
                <div
                  onClick={onOpen}
                  className="flex items-center gap-1 bg-black text-white text-xs cursor-pointer border px-2 py-1 rounded-md"
                >
                  <Plus className="size-4" />
                  Add Slider Images
                </div>
              </div>
              <FormControl>
                <Input disabled={disabled} placeholder="Image Url" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Slider Images Field */}
        {isOpen && (
          <div>
            <FieldArrayComponent control={form.control} />
          </div>
        )}

        {/* Submit Button */}
        <Button className="w-full" disabled={disabled}>
          Update Product
        </Button>
      </form>
    </Form>
  );
};
