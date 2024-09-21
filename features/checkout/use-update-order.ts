import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateEnquiry } from "@/lib/actions/enquries";
import { updateOrder } from "@/lib/actions/checkout";

export const useEditorder = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updateData: { status: string }) => {
      const response = await updateOrder(id as string, updateData);
      return response;
    },
    onSuccess: () => {
      toast.success("order Updated");
      queryClient.invalidateQueries({ queryKey: ["order", { id }] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to update the order");
    },
  });
  return mutation;
};
