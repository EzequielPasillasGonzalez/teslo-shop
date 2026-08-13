import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SIZES, type Size } from "@/shop/const/sizes";
import { PRICES, type Price } from "@/shop/const/prices";
import { useCustomParams } from "@/shop/hooks/useSearchParams";

export const FilterSidebar = () => {
  const { getQueryParam, setQueryParam } = useCustomParams();

  const currentSizes = getQueryParam("sizes");
  const currentPrice = getQueryParam("price");

  const handleSizeChanged = (size: Size) => {
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s != size)
      : [...currentSizes, size];

    setQueryParam("page", 1);
    setQueryParam("sizes", newSizes);
  };

  const handlePriceChange = (price: Price) => {
    setQueryParam("page", 1);
    if (price === "any") {
      setQueryParam("price", null);
    } else {
      setQueryParam("price", price);
    }
  };

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <Button
              key={size.id}
              variant={currentSizes.includes(size.id) ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => handleSizeChanged(size.id)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup
          defaultValue={currentPrice}
          onValueChange={handlePriceChange}
          className="space-y-3"
        >
          {PRICES.map((price) => (
            <div className="flex items-center space-x-2" key={price.id}>
              <RadioGroupItem value={price.label} id={price.id} />
              <Label htmlFor={price.id} className="text-sm cursor-pointer">
                {price.text.toUpperCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
