import { getBannerByBrand } from "@/lib/actions/product";
import { IPartnerBanner } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetBanner = (brand: string) => {
  const query = useQuery<IPartnerBanner, Error>({
    enabled: !!brand,
    queryKey: ["product", { brand }],
    queryFn: async () => {
      const response = await getBannerByBrand(brand);
      if (!response) {
        throw new Error("Failed to fetch banner");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
