import { lazy } from "react";

export const AuthLayout = lazy(() => import("@/auth/layouts/AuthLayout"));
export const AdminLayout = lazy(() => import("@/admin/layouts/AdminLayout"));
export const DashboardPage = lazy(
  () => import("@/admin/pages/dashboard/DashboardPage"),
);
export const AdminProductsPage = lazy(
  () => import("@/admin/pages/products/AdminProductsPage"),
);
export const AdminProductPage = lazy(
  () => import("@/admin/pages/product/AdminProductPage.tsx"),
);
export const LoginPage = lazy(() => import("@/auth/pages/login/LoginPage"));
export const RegisterPage = lazy(
  () => import("@/auth/pages/register/RegisterPage"),
);
export const ShopLayout = lazy(() => import("@/shop/layouts/ShopLayout"));
export const GenderPage = lazy(() => import("@/shop/pages/gender/GenderPage"));
export const HomePage = lazy(() => import("@/shop/pages/home/HomePage"));
export const ProductPage = lazy(
  () => import("@/shop/pages/product/ProductPage"),
);
