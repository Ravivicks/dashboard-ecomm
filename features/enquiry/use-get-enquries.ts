import { getAllEnquries } from "@/lib/actions/enquries";
import { CommonEnquireProps, EnquireProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetEnquiries = () => {
  const query = useQuery<CommonEnquireProps[], Error>({
    queryKey: ["enquries"],
    queryFn: async () => {
      const response = await getAllEnquries();
      if (!response) {
        throw new Error("Failed to fetch products");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
