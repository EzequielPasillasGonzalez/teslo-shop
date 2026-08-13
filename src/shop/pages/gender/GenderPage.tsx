import { CustomPagination } from "@/components/custom/CustomPagination.tsx";
import { products } from "@/mocks/products.ts";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron.tsx";
import { ProductsGrid } from "@/shop/components/ProductsGrid.tsx";
import { useCustomParams } from "@/shop/hooks/useSearchParams.tsx";

const GenderPage = () => {
  const { gender: genderPath } = useCustomParams();

  const genderLabel =
    genderPath === "men"
      ? "Hombres"
      : genderPath === "women"
        ? "Mujeres"
        : "Niños";

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={7} />
    </>
  );
};

export default GenderPage;
