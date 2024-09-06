import { getBannerById } from "@/lib/actions/upload";
import { IPartnerBannerFile } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetBanner = (id: string) => {
  const query = useQuery<IPartnerBannerFile, Error>({
    enabled: !!id,
    queryKey: ["banner", { id }],
    queryFn: async () => {
      const response = await getBannerById(id);
      if (!response) {
        throw new Error("Failed to fetch banner");
      }
      return response;
    },
  });
  return query;
};
