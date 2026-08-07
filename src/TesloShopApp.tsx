import { appRouter } from "@/router/app.router";
import { RouterProvider } from "react-router";

export const TesloShopApp = () => {
  return <RouterProvider router={appRouter} />;
};
