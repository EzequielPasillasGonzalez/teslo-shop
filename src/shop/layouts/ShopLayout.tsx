import { CustomFooter } from "@/shop/components/CustomFooter";
import { CustomHeader } from "@/shop/components/CustomHeader";
import { Outlet } from "react-router";

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />
      <Outlet />

      <CustomFooter />
    </div>
  );
};

export default ShopLayout;
