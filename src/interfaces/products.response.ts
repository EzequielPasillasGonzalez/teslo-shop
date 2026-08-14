import type { Product } from "@/interfaces/product.interface.ts";

export interface ProductsResponse {
  count: number;
  pages: number;
  products: Product[];
}
