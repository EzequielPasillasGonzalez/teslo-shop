import { Navigate, useParams } from "react-router";

import { useProduct } from "@/admin/hooks/useProduct.tsx";
import { CustomFullScreenLoading } from "@/admin/components/CustomFullScreenLoading.tsx";
import { AdminProdcutForm } from "@/admin/pages/product/ui/AdminProdcutForm.tsx";

const AdminProductPage = () => {
  const { id } = useParams();

  const { isLoading, isError, data: producto } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  // * redirecciones
  if (isLoading) {
    return <CustomFullScreenLoading />;
  }
  if (isError || !producto) {
    return <Navigate to={"/admin/products"} />;
  }

  return (
    <AdminProdcutForm title={title} subtitle={subtitle} product={producto} />
  );
};

export default AdminProductPage;
