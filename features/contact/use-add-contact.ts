import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IContact } from "@/types";
import { createNewContact } from "@/lib/actions/contact";

export const useCreateContact = () => {
  const mutation = useMutation({
    mutationFn: async (json: IContact) => {
      const response = await createNewContact(json);
      return response;
    },
    onSuccess: () => {
      toast.success("Contact Submitted Successfully");
    },
    onError: () => {
      toast.error("Failed to create an Contact");
    },
  });
  return mutation;
};
