import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProduct } from "@/lib/actions/product";

export const useEditProduct = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updateData: {
      title: string;
      discount: string;
      lowestPrice: number;
      image: string;
      sliderImages: string[];
      quantity: number;
      minQuantity: number;
      category: string;
      machineCode: string;
      type: string;
      subCategory: string;
    }) => {
      const response = await updateProduct(id as string, updateData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product Updated");
      queryClient.invalidateQueries({ queryKey: ["product", { id }] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to update the product");
    },
  });
  return mutation;
};
