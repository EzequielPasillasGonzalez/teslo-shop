import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";

const HomePage = () => {
  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <CustomPagination totalPages={7} />
    </>
  );
};

export default HomePage;
