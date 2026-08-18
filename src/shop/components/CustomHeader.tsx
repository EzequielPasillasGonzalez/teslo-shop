import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, type KeyboardEvent } from "react";

import { useShopQueryParams } from "@/shop/hooks/useParams";
import { cn } from "@/lib/utils.ts";
import { Link } from "react-router";
import { CustomLogo } from "@/components/custom/CustomLogo.tsx";
import { useAuthStore } from "@/auth/store/auth.store.ts";

export const CustomHeader = () => {
  const {
    getQueryParam,
    setQueryParam,
    gender: genderPath,
  } = useShopQueryParams();

  const { user, logout } = useAuthStore();

  const searchQuery = getQueryParam("search");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    setQueryParam("search", inputRef.current?.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CustomLogo />

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                !genderPath ? "underline underline-offset-4" : "",
              )}
            >
              Todos
            </a>
            <a
              href="/gender/men"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                genderPath === "men" ? "underline underline-offset-4" : "",
              )}
            >
              Hombre
            </a>
            <a
              href="/gender/women"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                genderPath === "women" ? "underline underline-offset-4" : "",
              )}
            >
              Mujeres
            </a>
            <a
              href="/gender/kid"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                genderPath === "kid" ? "underline underline-offset-4" : "",
              )}
            >
              Niños
            </a>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9 bg-white"
                  onKeyDown={handleInputSearch}
                  defaultValue={searchQuery}
                />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {!user ? (
              <Link to={"/auth/login"}>
                <Button variant={"default"} size={"sm"} className={"ml-2"}>
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                onClick={logout}
                variant={"outline"}
                size={"sm"}
                className={"ml-2"}
              >
                Cerrar Sesion
              </Button>
            )}

            <Link to={"/admin"}>
              <Button variant={"destructive"} size={"sm"} className={"ml-2"}>
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
