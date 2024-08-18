import { getAllProducts, getProductById } from "@/lib/actions/product";
import { IProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (id: string) => {
  const query = useQuery<IProduct, Error>({
    enabled: !!id,
    queryKey: ["product", { id }],
    queryFn: async () => {
      const response = await getProductById(id);
      if (!response) {
        throw new Error("Failed to fetch product");
      }
      return response;
    },
  });
  return query;
};
