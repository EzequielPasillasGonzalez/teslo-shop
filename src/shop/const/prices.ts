export const PRICES = [
  { id: "priceany", label: "any", text: "Cualquier precio" },
  { id: "price1", label: "0-50", text: "$0 - $50" },
  { id: "price2", label: "50-100", text: "$50 - $100" },
  { id: "price3", label: "100-200", text: "$100 - $200" },
  { id: "price4", label: "200+", text: "$200+" },
] as const;

// Extrae "any" | "0-50" | "50-100" | "100-200" | "200+"
export type Price = (typeof PRICES)[number]["label"];
