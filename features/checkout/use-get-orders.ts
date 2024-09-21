import { getOrders } from "@/lib/actions/checkout";
import { CheckoutData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderss = () => {
  const query = useQuery<CheckoutData[], Error>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      if (!response) {
        throw new Error("Failed to fetch orders");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
