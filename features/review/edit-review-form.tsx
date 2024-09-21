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
import { reviewFormSchema } from "@/lib/zod-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof reviewFormSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const ReviewForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(reviewFormSchema),
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
        <div className="flex gap-4">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
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
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
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
        </div>
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
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
                    <SelectItem value="active">Show</SelectItem>
                    <SelectItem value="inactive">Hide</SelectItem>
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
