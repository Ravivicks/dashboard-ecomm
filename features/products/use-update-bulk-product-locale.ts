import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IProduct, UpdateProductProps } from "@/types";
import {
  updateBulkProducts,
  updateBulkProductsLocale,
} from "@/lib/actions/product"; // Assuming the updateBulkProducts is in this path

export const useUpdateBulkProductLocale = () => {
  const mutation = useMutation({
    mutationFn: async (json: IProduct[]) => {
      const response = await updateBulkProductsLocale(json);
      return response;
    },
    onSuccess: () => {
      toast.success("All Products Updated Successfully");
    },
    onError: () => {
      toast.error("Failed to update bulk products");
    },
  });

  return mutation;
};
