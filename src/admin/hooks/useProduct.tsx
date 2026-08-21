import { createUpdateProductAction } from "@/admin/actions/create-update-product.action.ts";
import { getProductByIdAction } from "@/admin/actions/get-product-by-id.action.ts";
import type { Product } from "@/interfaces/product.interface.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // hasta que tenga un id se dispara
  });

  // mutation
  // La mutacion no se llama instantaneamente
  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      console.log("todo salio chido", product);
      // Se puede invalidar cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });
      // Se puede actualizar queryData
      queryClient.setQueryData(["products", { id: product.id }], product);
    },
  });

  return {
    ...query,
    mutation,
  };
};
