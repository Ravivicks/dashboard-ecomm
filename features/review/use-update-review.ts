import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateReview } from "@/lib/actions/review";

export const useUpdateReview = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updateData: { status: string }) => {
      const response = await updateReview(id as string, updateData);
      return response;
    },
    onSuccess: () => {
      toast.success("Review Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["order", { id }] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => {
      toast.error("Failed to submit reply");
    },
  });
  return mutation;
};
