// Design: Harajuku Confectionery — rounded cards with bow accents, hover float
import { Link } from "wouter";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/data";
import { toast } from "sonner";
import { withBasePath } from "@/lib/basePath";

interface ProductCardProps {
  product: Product;
}

const badgeColors: Record<string, string> = {
  "New": "bg-kawaii-mint text-emerald-800",
  "Best Seller": "bg-primary text-primary-foreground",
  "Limited": "bg-kawaii-lavender text-purple-800",
  "Popular": "bg-kawaii-coral text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0]?.name ?? "Default";
    addItem(product, defaultVariant, false);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link href={withBasePath(`/product/${product.id}`)} className="group block">
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 border border-kawaii-pink/10">
        {/* Bow accent */}
        <div className="absolute top-3 left-3 z-10 text-kawaii-pink opacity-30 text-2xl pointer-events-none" aria-hidden="true">
          🎀
        </div>

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold ${badgeColors[product.badge] || "bg-primary text-white"}`}
            style={{ fontFamily: "'Quicksand', sans-serif" }}>
            {product.badge}
          </div>
        )}

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-kawaii-blush/30">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.hook}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">€{product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">€{product.comparePrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleQuickAdd}
              className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label={`Quick add ${product.name} to cart`}
            >
              <ShoppingBag size={16} />
            </button>
          </div>
          {product.inStock && product.stockCount && product.stockCount <= 10 && (
            <p className="text-xs text-kawaii-coral mt-2 font-medium">
              Only {product.stockCount} left in stock!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
