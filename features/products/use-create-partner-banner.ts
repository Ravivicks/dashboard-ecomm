import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IPartnerBanner } from "@/types";
import { createNewPartnerBanner } from "@/lib/actions/product";

export const useCreatePartnerBanner = () => {
  const mutation = useMutation({
    mutationFn: async (json: IPartnerBanner) => {
      const response = await createNewPartnerBanner(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Banner Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to create a banner");
    },
  });
  return mutation;
};
