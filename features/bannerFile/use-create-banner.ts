import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNewPartnerBanner } from "@/lib/actions/upload";

export const useCreatePartnerBanner = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await createNewPartnerBanner(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Banner Submitted Successfully");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: (error: unknown) => {
      console.error("Error in useCreatePartnerBanner:", error);

      if (error instanceof Error) {
        toast.error(`Failed to create banner: ${error.message}`);
      } else {
        toast.error("Failed to create banner");
      }
    },
  });

  return mutation;
};
