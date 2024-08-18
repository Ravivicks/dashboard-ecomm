import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { EnquireProps } from "@/types";
import { createNewEnquiry } from "@/lib/actions/enquries";

export const useCreateEnquiry = () => {
  const mutation = useMutation({
    mutationFn: async (json: EnquireProps) => {
      const response = await createNewEnquiry(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Enquiry Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to create an enquiry");
    },
  });
  return mutation;
};
