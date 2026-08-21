import { Navigate, useNavigate, useParams } from "react-router";

import { useProduct } from "@/admin/hooks/useProduct.tsx";
import { CustomFullScreenLoading } from "@/admin/components/CustomFullScreenLoading.tsx";
import { AdminProdcutForm } from "@/admin/pages/product/ui/AdminProdcutForm.tsx";
import type { Product } from "@/interfaces/product.interface.ts";
import { toast } from "sonner";

const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: producto, mutation } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        });

        navigate(`/admin/products/${data.id}`);
      },

      onError: (error) => {
        console.log(error);
        toast.error("Error al actaulizar o crear");
      },
    });
  };

  // * redirecciones
  if (isLoading) {
    return <CustomFullScreenLoading />;
  }
  if (isError || !producto) {
    return <Navigate to={"/admin/products"} />;
  }

  return (
    <AdminProdcutForm
      title={title}
      subtitle={subtitle}
      product={producto}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  );
};

export default AdminProductPage;
