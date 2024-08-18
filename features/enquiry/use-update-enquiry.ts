import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateEnquiry } from "@/lib/actions/enquries";

export const useEditEnquiry = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updateData: {
      quantity: number;
      status: string;
      reason: string;
    }) => {
      const response = await updateEnquiry(id as string, updateData);
      return response;
    },
    onSuccess: () => {
      toast.success("Enquiry Updated");
      queryClient.invalidateQueries({ queryKey: ["enquiry", { id }] });
      queryClient.invalidateQueries({ queryKey: ["enquries"] });
    },
    onError: () => {
      toast.error("Failed to update the enquiry");
    },
  });
  return mutation;
};
