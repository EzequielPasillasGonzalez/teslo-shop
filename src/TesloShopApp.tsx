import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { appRouter } from "@/router/app.router";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

import type { PropsWithChildren } from "react";
import { CustomFullScreenLoading } from "@/admin/components/CustomFullScreenLoading.tsx";
import { useAuthStore } from "@/auth/store/auth.store.ts";
const queryClient = new QueryClient();

// Verifica el estado de y se ejecuta despues de que se inyecta el queryClient
const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1, // hace la peticion cada hora para hacer check el token
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {/* Custom provider */}
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
