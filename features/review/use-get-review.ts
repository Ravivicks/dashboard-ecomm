import { getReviewById } from "@/lib/actions/review";
import { IComment } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetReview = (id: string) => {
  const query = useQuery<IComment, Error>({
    enabled: !!id,
    queryKey: ["review", { id }],
    queryFn: async () => {
      const response = await getReviewById(id);
      if (!response) {
        throw new Error("Failed to fetch review");
      }
      return response;
    },
  });
  return query;
};
