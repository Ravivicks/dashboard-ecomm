import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategoryAndQuantityByCode } from "@/lib/actions/product";

export const useEditProductCategoryAndQuantity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updateData: {
      productCode: string;
      category: string;
      quantity: number;
    }) => {
      // Call the function to update category and quantity based on productCode
      const response = await updateCategoryAndQuantityByCode(
        updateData.productCode,
        updateData.category,
        updateData.quantity
      );
      return response;
    },
    onSuccess: () => {
      // Show success message
      toast.success("Product Updated");

      // Invalidate queries to ensure the data is refreshed
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Adjust the query key as needed
    },
    onError: () => {
      // Show error message
      toast.error("Failed to update the product");
    },
  });

  return mutation;
};
