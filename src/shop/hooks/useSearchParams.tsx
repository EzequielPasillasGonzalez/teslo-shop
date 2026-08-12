import type { Price } from "@/shop/const/prices";
import { SIZES, type Size } from "@/shop/const/sizes";
import type { ViewMode } from "@/shop/enums/viewMode";
import { useSearchParams } from "react-router";

export interface QueryParamsMap {
  page: number;
  limit: number;
  viewMode: ViewMode;
  sizes: Size[];
  price: Price;
  search: string;
}

export type QueryParamKey = keyof QueryParamsMap;

// Tipamos las opciones múltiples como un objeto parcial
type QueryParamsObj = Partial<QueryParamsMap>;

export const useCustomParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Firma 1: Permite pasar un solo key-value
  function setParam<K extends QueryParamKey>(
    key: K,
    value: QueryParamsMap[K] | null | undefined,
  ): void;
  // Firma 2: Permite pasar un objeto con múltiples parámetros
  function setParam(paramsObj: QueryParamsObj): void;

  function setParam<K extends QueryParamKey>(
    keyOrObj: K | QueryParamsObj,
    value?: QueryParamsMap[K] | null | undefined,
  ) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      const applyParam = (k: string, v: unknown) => {
        //  Si estamos seteando 'search', limpiamos los filtros de price y sizes
        if (k === "search" && typeof v === "string" && v.trim() !== "") {
          params.delete("price");
          params.delete("sizes");
        }
        if (Array.isArray(v)) {
          // Manejo automático de arrays
          if (v.length === 0) {
            params.delete(k);
          } else {
            params.set(k, v.join(","));
          }
          return;
        }

        // Borrado de params nulos/vacíos o asignación estándar
        if (v === undefined || v === null || v === "" || v === "any") {
          params.delete(k);
        } else {
          params.set(k, String(v));
        }
      };

      if (typeof keyOrObj === "object" && keyOrObj !== null) {
        Object.entries(keyOrObj).forEach(([k, v]) => applyParam(k, v));
      } else if (typeof keyOrObj === "string") {
        applyParam(keyOrObj, value);
      }

      return params;
    });
  }

  //  Función genérica fuertemente tipada
  const getParam = <K extends QueryParamKey>(
    key: K,
    defaultValue?: QueryParamsMap[K],
  ): QueryParamsMap[K] => {
    const rawValue = searchParams.get(key);

    if (rawValue === null || rawValue === undefined) {
      return (defaultValue ?? _getDefaultValueForKey(key)) as QueryParamsMap[K];
    }

    // Parsing numérico para page y limit
    if (key === "page" || key === "limit") {
      const parsed = parseInt(rawValue, 10);
      return (
        isNaN(parsed) ? (defaultValue ?? _getDefaultValueForKey(key)) : parsed
      ) as QueryParamsMap[K];
    }

    // Normalización de sizes a Array de Tallas válidas
    if (key === "sizes") {
      const validIds = SIZES.map((s) => s.id as string);
      const parsedSizes = rawValue
        .split(",")
        .filter((s) => validIds.includes(s)) as Size[];

      return (
        parsedSizes.length > 0 ? parsedSizes : (defaultValue ?? [])
      ) as QueryParamsMap[K];
    }

    return rawValue as QueryParamsMap[K];
  };

  // Helper privado para fallbacks seguros por defecto
  const _getDefaultValueForKey = <K extends QueryParamKey>(
    key: K,
  ): QueryParamsMap[K] => {
    const defaults: QueryParamsMap = {
      page: 1,
      limit: 10,
      price: "any" as Price,
      sizes: [],
      viewMode: "grid" as ViewMode,
      search: "",
    };
    return defaults[key];
  };
  return {
    setParam,
    getParam,
  };
};
