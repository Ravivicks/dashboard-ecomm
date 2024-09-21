import { getAllSubcriber } from "@/lib/actions/subscriber";
import { ISubscriber } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscribers = () => {
  const query = useQuery<ISubscriber[], Error>({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const response = await getAllSubcriber();
      if (!response) {
        throw new Error("Failed to fetch subscribers");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
