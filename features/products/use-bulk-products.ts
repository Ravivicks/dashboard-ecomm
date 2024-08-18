import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IProduct } from "@/types";
import { createBulkProducts } from "@/lib/actions/product";

export const useCreateBulkProduct = () => {
  const mutation = useMutation({
    mutationFn: async (json: IProduct[]) => {
      const response = await createBulkProducts(json);
      return response;
    },
    onSuccess: () => {
      toast.success("All Product Added Successfully");
    },
    onError: () => {
      toast.error("Failed to create bulk products");
    },
  });
  return mutation;
};
