import { getAllBanners } from "@/lib/actions/upload";
import { IPartnerBannerFile } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetBanners = () => {
  const query = useQuery<IPartnerBannerFile[], Error>({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await getAllBanners();
      if (!response) {
        throw new Error("Failed to fetch banners");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
