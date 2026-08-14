import { getProductsAction } from "@/shop/actions/get-products.action.ts";
import { useShopQueryParams } from "@/shop/hooks/useParams.tsx";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { getQueryParam, gender } = useShopQueryParams();

  const limit = getQueryParam("limit", 9);
  const page = getQueryParam("page", 1);
  const sizes = getQueryParam("sizes", []);
  const price = getQueryParam("price", "any");

  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case "any":
      break;
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;

    default:
      break;
  }

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: [
      "products",
      { offset, limit, gender, sizes, minPrice, maxPrice },
    ],
    queryFn: () =>
      getProductsAction({
        limit,
        offset: isNaN(offset) ? 0 : offset,
        sizes,
        gender,
        minPrice,
        maxPrice,
      }),
    staleTime: 100 * 60 * 5,
  });
};
