import { getProductByIdAction } from "@/admin/actions/get-product-by-id.action.ts";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // hasta que tenga un id se dispara
  });

  return {
    ...query,
  };
};
