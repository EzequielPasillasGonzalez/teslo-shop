import { getProductsAction } from "@/shop/actions/get-products.action.ts";
import { useShopQueryParams } from "@/shop/hooks/useParams.tsx";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { getQueryParam } = useShopQueryParams();

  const limit = getQueryParam("limit") || 9;
  const page = getQueryParam("page") || 1;

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: ["products", { offset, limit }],
    queryFn: () =>
      getProductsAction({
        limit,
        offset: isNaN(offset) ? 0 : offset,
      }),
    staleTime: 100 * 60 * 5,
  });
};
