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
import { formBannerFileSchema } from "@/lib/zod-schema";
import Image from "next/image";
import { useGetBanner } from "./use-get-banner";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type FormValues = z.infer<typeof formBannerFileSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues & { file?: File; imageId?: string }) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const BannerFileForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
  onDelete,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formBannerFileSchema),
    defaultValues: defaultValues,
  });

  // State to handle image preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  // Fetch banner data for edit scenario
  const bannerQuery = useGetBanner(id as string);

  // Effect to set the initial image if in edit mode and no new image is selected
  useEffect(() => {
    if (bannerQuery.data?.imageId && !previewUrl) {
      const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/images/${bannerQuery.data.imageId}`;
      setPreviewUrl(imageUrl); // Set preview to the existing image
    }
  }, [bannerQuery.data, previewUrl]);

  const onFormSubmit = (data: FormValues) => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      // If a new image is selected, submit it
      onSubmit({ ...data, file });
    } else {
      // If no new file, submit with the existing image ID
      onSubmit({ ...data, imageId: bannerQuery?.data?.imageId });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl); // Preview the selected image
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <Button variant="outline" className="w-full">
                      {field.value || "Select Title"}
                    </Button>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="Featured-category">
                      Featured Category
                    </SelectItem>
                    <SelectItem value="industrial-automation">
                      Industrial Automation
                    </SelectItem>
                    <SelectItem value="partner-banner">
                      Partner Banner
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <Button variant="outline" className="w-full">
                      {field.value || "Select Company"}
                    </Button>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Siemens">Siemens</SelectItem>
                    <SelectItem value="DEIF">DEIF</SelectItem>
                    <SelectItem value="pro-face">Pro-face</SelectItem>
                    <SelectItem value="Schneider Electric">
                      Schneider Electric
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Category name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  disabled={disabled}
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e); // Sync with form state
                    handleImageChange(e); // Handle preview
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Show the initial image (from API) or the new image preview */}
        {previewUrl && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-sm">
              <p>Image Preview</p>
              <div
                onClick={() => setIsShow(!isShow)}
                className="text-destructive flex gap-1 cursor-pointer hover:underline hover:cursor-pointer transition"
              >
                {isShow ? "Hide Image" : "Show Image"}
                {!isShow ? (
                  <ChevronDown className="size-2" />
                ) : (
                  <ChevronUp className="size-3" />
                )}
              </div>
            </div>
            {isShow && (
              <Image
                src={previewUrl}
                alt="Image preview"
                layout="responsive"
                width={800} // Custom width
                height={50} // Custom height
                className="object-contain" // Ensure the image covers the area without distortion
                unoptimized
              />
            )}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={disabled}>
          {!id ? "Add Banner" : "Update Banner"}
        </Button>
      </form>
    </Form>
  );
};
