import { getProductsAction } from "@/shop/actions/get-products.action.ts";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsAction,
  });
};
