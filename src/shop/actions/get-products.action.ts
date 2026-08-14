import { tesloApi } from "@/api/tesloApi.ts";
import type { ProductsResponse } from "@/interfaces/products.response.ts";

interface Options {
  limit?: number | string;
  offset?: number | string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
    },
  });

  const productsWithImaegUrl = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return {
    ...data,
    products: productsWithImaegUrl,
  };
};
