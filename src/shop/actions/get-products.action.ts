import { tesloApi } from "@/api/tesloApi.ts";
import type { ProductsResponse } from "@/interfaces/products.response.ts";

export const getProductsAction = async (): Promise<ProductsResponse> => {
  const { data } = await tesloApi.get<ProductsResponse>("/products");

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
