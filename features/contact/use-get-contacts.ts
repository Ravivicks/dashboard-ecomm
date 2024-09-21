import { getAllContacts } from "@/lib/actions/contact";
import { IContact } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetContacts = () => {
  const query = useQuery<IContact[], Error>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await getAllContacts();
      if (!response) {
        throw new Error("Failed to fetch contacts");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
