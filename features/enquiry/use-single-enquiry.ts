import { getEnquiryById } from "@/lib/actions/enquries";
import { CommonEnquireProps, EnquireProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetEnquiry = (id: string) => {
  const query = useQuery<CommonEnquireProps, Error>({
    enabled: !!id,
    queryKey: ["enquiry", { id }],
    queryFn: async () => {
      const response = await getEnquiryById(id);
      if (!response) {
        throw new Error("Failed to fetch enquiry");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
