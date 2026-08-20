import React, { useRef, type KeyboardEvent } from "react";
import { Search, Bell, MessageSquare, Settings } from "lucide-react";
import { useShopQueryParams } from "@/shop/hooks/useParams.tsx";
import { Input } from "@/components/ui/input.tsx";

const AdminHeader: React.FC = () => {
  const { getQueryParam, setQueryParam } = useShopQueryParams();

  const searchQuery = getQueryParam("search");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    setQueryParam("search", inputRef.current?.value);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              ref={inputRef}
              placeholder="Buscar productos..."
              className="pl-9 w-64 h-9 bg-white"
              onKeyDown={handleInputSearch}
              defaultValue={searchQuery}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
