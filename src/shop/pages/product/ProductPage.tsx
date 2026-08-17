import { useCounterStore } from "@/auth/store/auth.store.ts";

const ProductPage = () => {
  const { count, inc, dec } = useCounterStore();

  return (
    <>
      <h1 className="text-3xl font-monserrat">Count: {count}</h1>

      <button onClick={inc}>+1</button>
      <button onClick={dec}>-1</button>
    </>
  );
};

export default ProductPage;
