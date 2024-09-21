import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["file/xlsx", "file/xls"];

export const formSchema = z.object({
  email: z.string().email(),
  mobile: z.string(),
  productName: z.string(),
  productId: z.string(),
  productPrice: z.number(),
  enquiryDescription: z.string(),
  quantity: z.number(),
});
export const formBannerSchema = z.object({
  image: z.string(),
  brand: z.string(),
});
export const productUpdateFormSchema = z.object({
  productCode: z.string(),
  category: z.string(),
  quantity: z.number(),
});
export const formBannerFileSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string(),
  category: z.string(),
  // `image` will be handled as a file separately
});

export const productFormSchema = z.object({
  title: z.string(),
  discount: z.string(),
  price: z.number(),
  image: z.string(), // Image should be a string (URL)
  sliderImages: z.array(z.string()),
  quantity: z.number(),
  minQuantity: z.number(), // Array of strings (URLs)
  category: z.string(),
  machineCode: z.string(),
  type: z.string(),
});
export const orderFormSchema = z.object({
  userId: z.string(),
  orderId: z.string(),
  status: z.string(),
});
export const reviewFormSchema = z.object({
  userId: z.string(),
  comment: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  status: z.string(),
});
export const enquiryFormSchema = z.object({
  productName: z.string(),
  productPrice: z.number().optional(), // Allow undefined
  email: z.string(),
  mobile: z.string(),
  quantity: z.number().optional(), // Allow undefined
  status: z.string(),
  reason: z.string().optional(), // Allow undefined
});
export const contactFormSchema = z.object({
  company: z.string(),
  address: z.string(),
  phone: z.string(),
  workingHours: z.string(),
  email: z.string(),
});

export const FileFormSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "File must be xlsx, xls"),
});
