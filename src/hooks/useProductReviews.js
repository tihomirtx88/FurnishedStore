import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../utils/idnex";

export const useProductReviews = (productId, user) => {
  return useQuery({
    queryKey: ["productReviews", productId],
    queryFn: async () => {
      const res = await customFetch(`/reviews/product/${productId}`);
      return res.data;
    },
    enabled: !!user && !!productId,
  });
};