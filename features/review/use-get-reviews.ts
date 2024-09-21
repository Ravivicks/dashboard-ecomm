import { getAllReviews } from "@/lib/actions/review";
import { IComment } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetReviews = () => {
  const query = useQuery<IComment[], Error>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await getAllReviews();
      if (!response) {
        throw new Error("Failed to fetch reviews");
      }
      return response;
    },
  });
  return query;
};
