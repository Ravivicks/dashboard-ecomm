import { getContactById } from "@/lib/actions/contact";
import { IContact } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetContact = (id: string) => {
  const query = useQuery<IContact, Error>({
    enabled: !!id,
    queryKey: ["contact", { id }],
    queryFn: async () => {
      const response = await getContactById(id);
      if (!response) {
        throw new Error("Failed to fetch contact");
      }
      return response;
    },
  });
  return query;
};
