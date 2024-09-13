import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IProduct, UpdateProductProps } from "@/types";
import { updateBulkProducts } from "@/lib/actions/product"; // Assuming the updateBulkProducts is in this path

export const useUpdateBulkProduct = () => {
  const mutation = useMutation({
    mutationFn: async (json: IProduct[]) => {
      const response = await updateBulkProducts(json);
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
