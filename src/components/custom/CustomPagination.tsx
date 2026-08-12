import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
  limit?: number;
  offset?: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get("page") ?? "1";
  const queryLimit = searchParams.get("limit") ?? "1";

  const page: number = isNaN(+queryPage) ? 1 : +queryPage;
  const limit: number = isNaN(+queryLimit) ? 6 : +queryLimit;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set("page", page.toString());

    setSearchParams(searchParams);
  };

  const handleLimitChange = (limit: number) => {
    if (limit < 1 || limit > 100) return;

    searchParams.set("limit", limit.toString());

    setSearchParams(searchParams);
  };

  // Función para calcular las páginas a mostrar alrededor de la página actual
  const getVisiblePages = (
    currentPage: number,
    totalPages: number,
    maxVisible = 3,
  ) => {
    // Calculamos el inicio intentando centrar la página actual
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    // Si nos pasamos del total de páginas, ajustamos el inicio
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    // Generamos el array con los números reales de página [start, ..., end]
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {/*  Mostramos siempre la primera pagina */}
      {page > 3 && (
        <Button variant="outline" size="sm" onClick={() => handlePageChange(1)}>
          1
        </Button>
      )}

      {/* Mostramos los puntos suspensivos solo si pasamos mas de 3 paginas */}
      {page + 1 > 4 && (
        <Button variant="ghost" size="sm" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )}

      {/* Obtenemos las páginas visibles dinámicas (ej. [4, 5, 6])  */}
      {getVisiblePages(page, totalPages, 3).map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={page === pageNumber ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}

      {/* Mostramos los puntos suspensivos solo si no hemos llegado a la última página */}
      {page + 1 < totalPages && totalPages > 3 && (
        <Button variant="ghost" size="sm" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )}

      {/* Mostrar siempre el botón de la última página al final */}
      {page + 1 < totalPages && totalPages > 3 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline">Limit: {limit}</Button>}
        />
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={limit}
            onValueChange={handleLimitChange}
          >
            <DropdownMenuRadioItem value="6">6</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="9">9</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="12">12</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
