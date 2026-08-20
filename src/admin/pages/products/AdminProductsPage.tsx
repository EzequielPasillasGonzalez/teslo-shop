import { AdminTitle } from "@/admin/components/AdminTitle.tsx";
import { CustomPagination } from "@/components/custom/CustomPagination.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table.tsx";
import { currencyFormatter } from "@/lib/currencyFormatter.ts";
import { useProducts } from "@/shop/hooks/useProducts.tsx";
import { PencilIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

const AdminProductsPage = () => {
  const { data } = useProducts();

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos"
        />
        <Link to={"/admin/products/new"}>
          <Button>
            <PlusIcon />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 pb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products && data.products.length > 0 ? (
            data.products.map((product) => (
              <TableRow>
                <TableCell>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="hover:text-blue-500 underline"
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell> {currencyFormatter(product.price)}</TableCell>
                <TableCell>{product.gender}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.sizes.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/admin/products/${product.id}`}>
                    <PencilIcon className="w-4 h-4 text-blue-500" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={8} className="text-center">
              No se encontraron productos
            </TableCell>
          )}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
export default AdminProductsPage;
