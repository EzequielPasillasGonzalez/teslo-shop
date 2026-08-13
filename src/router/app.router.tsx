import { type ComponentType, type LazyExoticComponent, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import {
  AdminLayout,
  AdminProductPage,
  AdminProductsPage,
  AuthLayout,
  DashboardPage,
  GenderPage,
  HomePage,
  LoginPage,
  ProductPage,
  RegisterPage,
  ShopLayout,
} from "./lazy-components";

// Helper tipado para renderizar lazy componentes
const load = (Component: LazyExoticComponent<ComponentType<any>>) => (
  <Suspense
    fallback={
      <div className="flex h-screen items-center justify-center">
        <span>Cargando...</span>
      </div>
    }
  >
    <Component />
  </Suspense>
);

export const appRouter = createBrowserRouter([
  // Main routes
  {
    path: "/",
    element: load(ShopLayout),
    children: [
      {
        index: true,
        element: load(HomePage),
      },
      {
        path: "product/:idSlug",
        element: load(ProductPage),
      },
      {
        path: "gender/:gender",
        element: load(GenderPage),
      },
    ],
  },
  // Auth routes
  {
    path: "/auth",
    element: load(AuthLayout),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "login",
        element: load(LoginPage),
      },
      {
        path: "register",
        element: load(RegisterPage),
      },
    ],
  },
  // Admin routes
  {
    path: "/admin",
    element: load(AdminLayout),
    children: [
      {
        index: true,
        element: load(DashboardPage),
      },
      {
        path: "products",
        element: load(AdminProductsPage),
      },
      {
        path: "products/:id",
        element: load(AdminProductPage),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
