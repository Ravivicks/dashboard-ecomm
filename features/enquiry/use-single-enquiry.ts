import { getEnquiryById } from "@/lib/actions/enquries";
import { EnquireProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetEnquiry = (id: string) => {
  const query = useQuery<EnquireProps, Error>({
    enabled: !!id,
    queryKey: ["enquiry", { id }],
    queryFn: async () => {
      const response = await getEnquiryById(id);
      if (!response) {
        throw new Error("Failed to fetch enquiry");
      }
      return response;
    },
  });
  return query;
};
