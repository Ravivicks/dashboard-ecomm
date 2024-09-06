import { deleteBannerById } from "@/lib/actions/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePartnerBanner = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await deleteBannerById(id);
    },
    onSuccess: () => {
      toast.success("Banner Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => {
      toast.error("Failed to delete the banner");
    },
  });

  return mutation;
};
