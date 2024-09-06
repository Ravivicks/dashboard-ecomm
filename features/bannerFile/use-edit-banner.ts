import { updatePartnerBanner } from "@/lib/actions/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditPartnerBanner = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await updatePartnerBanner(id as string, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Banner Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["banner", { id }] });
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => {
      toast.error("Failed to update the banner");
    },
  });

  return mutation;
};
