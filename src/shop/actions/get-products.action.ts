import { tesloApi } from "@/api/tesloApi.ts";
import type { ProductsResponse } from "@/interfaces/products.response.ts";

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string[];
  gender?: string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, gender, sizes } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      sizes: sizes?.join(","),
      gender,
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
