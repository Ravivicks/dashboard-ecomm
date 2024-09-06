import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateContact } from "@/lib/actions/contact";

export const useEditContact = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updateData: {
      email: string;
      phone: string;
      workingHours: string;
      address: string;
    }) => {
      const response = await updateContact(id as string, updateData);
      return response;
    },
    onSuccess: () => {
      toast.success("Contact Updated");
      queryClient.invalidateQueries({ queryKey: ["contact", { id }] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      toast.error("Failed to update the contact");
    },
  });
  return mutation;
};
