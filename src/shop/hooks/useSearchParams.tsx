import type { Price } from "@/shop/const/prices";
import { SIZES, type Size } from "@/shop/const/sizes";
import type { ViewMode } from "@/shop/enums/viewMode";
import { useParams, useSearchParams } from "react-router";

export interface QueryParamsMap {
  page: number;
  limit: number;
  viewMode: ViewMode;
  sizes: Size[];
  price: Price;
  search: string;
  category: string;
  inStock: boolean;
}

export type PathParams = Record<string, string | undefined> & {
  gender?: string;
};

export type QueryParamKey = keyof QueryParamsMap;
// Tipamos las opciones múltiples como un objeto parcial
type QueryParamsObj = Partial<QueryParamsMap>;

// Valores por defecto centralizados
const DEFAULT_PARAMS: QueryParamsMap = {
  page: 1,
  limit: 10,
  price: "any" as Price,
  sizes: [],
  viewMode: "grid" as ViewMode,
  search: "",
  category: "all",
  inStock: false,
};

// Estrategias de Parseo (De URL String a Tipo TS)
const PARSERS: { [K in QueryParamKey]?: (val: string) => QueryParamsMap[K] } = {
  page: (val) => parseInt(val, 10) || DEFAULT_PARAMS.page,
  limit: (val) => parseInt(val, 10) || DEFAULT_PARAMS.limit,
  sizes: (val) => {
    const validIds = SIZES.map((s) => s.id as string);
    return val.split(",").filter((s) => validIds.includes(s)) as Size[];
  },
  inStock: (val) => val === "true",
};

export const useCustomParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pathParams = useParams<PathParams>();

  // Firma 1: Permite pasar un solo key-value
  function setQueryParam<K extends QueryParamKey>(
    key: K,
    value: QueryParamsMap[K] | null | undefined,
  ): void;
  // Firma 2: Permite pasar un objeto con múltiples parámetros
  function setQueryParam(paramsObj: QueryParamsObj): void;

  function setQueryParam<K extends QueryParamKey>(
    keyOrObj: K | QueryParamsObj,
    value?: QueryParamsMap[K] | null | undefined,
  ) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      const applySingleParam = (k: string, v: unknown) => {
        // Regla global: si buscas algo, reseteas filtros
        if (k === "search" && typeof v === "string" && v.trim() !== "") {
          params.delete("price");
          params.delete("sizes");
        }

        // Auto-serialización por tipo de dato JS
        if (
          v === undefined ||
          v === null ||
          v === "" ||
          v === "any" ||
          v === false
        ) {
          params.delete(k);
        } else if (Array.isArray(v)) {
          if (v.length === 0) {
            params.delete(k);
          } else {
            params.set(k, v.join(","));
          }
        } else {
          params.set(k, String(v));
        }
      };

      if (typeof keyOrObj === "object" && keyOrObj !== null) {
        Object.entries(keyOrObj).forEach(([k, v]) => applySingleParam(k, v));
      } else if (typeof keyOrObj === "string") {
        applySingleParam(keyOrObj, value);
      }

      return params;
    });
  }
  // getQueryParam genérico y escalable
  const getQueryParam = <K extends QueryParamKey>(
    key: K,
    defaultValue?: QueryParamsMap[K],
  ): QueryParamsMap[K] => {
    const rawValue = searchParams.get(key);

    if (rawValue === null || rawValue === undefined) {
      return defaultValue ?? DEFAULT_PARAMS[key];
    }

    // Si existe un parser customizado en nuestro diccionario, lo usa
    const parser = PARSERS[key];
    if (parser) {
      return parser(rawValue) as QueryParamsMap[K];
    }

    // Si no requiere parser especial (ej. string simple), retorna directamente
    return rawValue as QueryParamsMap[K];
  };
  return {
    ...pathParams,
    setQueryParam,
    getQueryParam,
  };
};
