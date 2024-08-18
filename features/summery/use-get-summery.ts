import { getStats, IStats } from "@/lib/actions/summery";
import { useQuery } from "@tanstack/react-query";

export const useGetSummery = () => {
  const query = useQuery<IStats, Error>({
    queryKey: ["summery"],
    queryFn: async () => {
      const response = await getStats();
      if (!response) {
        throw new Error("Failed to fetch stats");
      }
      return response;
    },
  });

  return query;
};
