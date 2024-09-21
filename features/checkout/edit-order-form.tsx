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
import { orderFormSchema, productFormSchema } from "@/lib/zod-schema";
import { Plus, Trash } from "lucide-react";
import FieldArrayComponent from "@/components/FieldArray";
import { useSlideOpen } from "@/hooks/use-slide-open";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof orderFormSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const OrderForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(orderFormSchema),
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
          name="userId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Id</FormLabel>
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
        <FormField
          name="orderId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order ID</FormLabel>
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
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  // value={field.value}
                  disabled={disabled}
                  {...field}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="packed">Order Packed</SelectItem>
                    <SelectItem value="in-shipping">
                      Ready For Shipping
                    </SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="in-transit">In-Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full" disabled={disabled}>
          Update Product
        </Button>
      </form>
    </Form>
  );
};
