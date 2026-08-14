import { CustomPagination } from "@/components/custom/CustomPagination.tsx";

import { CustomJumbotron } from "@/shop/components/CustomJumbotron.tsx";
import { ProductsGrid } from "@/shop/components/ProductsGrid.tsx";
import { useProducts } from "@/shop/hooks/useProducts.tsx";
import { useShopQueryParams } from "@/shop/hooks/useParams";

const GenderPage = () => {
  const { gender: genderPath } = useShopQueryParams();
  const { data } = useProducts();

  const genderLabel =
    genderPath === "men"
      ? "Hombres"
      : genderPath === "women"
        ? "Mujeres"
        : "Niños";

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <ProductsGrid products={data?.products || []} />
      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};

export default GenderPage;
