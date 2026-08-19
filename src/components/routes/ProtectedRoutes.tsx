import { useAuthStore } from "@/auth/store/auth.store.ts";
import { Suspense, type PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated") {
    return <Navigate to={"/auth/login"} />;
  }

  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "authenticated") {
    return <Navigate to={"/"} />;
  }

  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated") {
    return <Navigate to={"/auth/login"} />;
  }

  if (!isAdmin()) return <Navigate to={"/"} />;

  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
};

// Helper tipado para renderizar lazy componentes
// Componente visual de carga reutilizable
const FullScreenLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <span>Cargando...</span>
  </div>
);
