// Design: Harajuku Confectionery — Collection page with filters
import { useState, useMemo } from "react";
import { products, packingVideoProduct } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import { faqs } from "@/lib/data";
import { Link } from "wouter";
import { SlidersHorizontal, X } from "lucide-react";
import BestSellerPopup from "@/components/BestSellerPopup";

type SortOption = "featured" | "price-low" | "price-high" | "newest";
type ThemeFilter = "all" | "kawaii" | "pastel" | "character";

export default function Catalog() {
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [themeFilter, setThemeFilter] = useState<ThemeFilter>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const allProducts = [...products, {
    ...packingVideoProduct,
    badge: undefined as any,
    hook: "Watch us pack your order with love!",
    theme: "kawaii" as const,
    color: "pink",
    inStock: true,
    stockCount: 999,
    hasVideoOption: false,
    variants: [{ name: "Packing Video", price: 7.00 }],
    whatYouMightGet: [],
    comparePrice: undefined,
  }];

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(p => {
      if (themeFilter !== "all" && p.theme !== themeFilter) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.reverse(); break;
      default: break;
    }

    return result;
  }, [sortBy, themeFilter, priceRange]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-kawaii-blush via-white to-kawaii-lavender/20 py-10 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Mystery Scoops
            </h1>
            <p className="text-foreground/60 mt-2 max-w-md mx-auto">
              Browse our collection of kawaii mystery boxes — each one packed with adorable surprises!
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-primary transition-colors md:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <p className="text-sm text-muted-foreground hidden md:block">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-kawaii-pink/20 rounded-full px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-56 flex-shrink-0`}>
              <div className="bg-white rounded-2xl p-5 border border-kawaii-pink/10 shadow-sm space-y-6 sticky top-24">
                <div className="flex items-center justify-between md:hidden">
                  <h3 className="font-bold text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>Filters</h3>
                  <button onClick={() => setShowFilters(false)}><X size={18} /></button>
                </div>

                {/* Theme Filter */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Theme
                  </h4>
                  <div className="space-y-2">
                    {(["all", "kawaii", "pastel", "character"] as ThemeFilter[]).map(theme => (
                      <label key={theme} className="flex items-center gap-2 text-sm cursor-pointer group">
                        <input
                          type="radio"
                          name="theme"
                          checked={themeFilter === theme}
                          onChange={() => setThemeFilter(theme)}
                          className="accent-primary"
                        />
                        <span className="text-foreground/70 group-hover:text-primary transition-colors capitalize">
                          {theme === "all" ? "All Themes" : theme}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Price Range
                  </h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 text-sm border border-kawaii-pink/20 rounded-lg text-center"
                      min={0}
                    />
                    <span className="text-muted-foreground text-xs">to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-20 px-2 py-1 text-sm border border-kawaii-pink/20 rounded-lg text-center"
                      max={200}
                    />
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => { setThemeFilter("all"); setPriceRange([0, 100]); setSortBy("featured"); }}
                  className="text-xs text-primary hover:text-kawaii-hot transition-colors font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-5xl mb-4 block">🍨</span>
                  <p className="text-lg font-semibold text-foreground/70" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    No scoops found
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product as any} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-16 bg-kawaii-blush/20">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqs.slice(0, 5)} />
          </div>
        </section>
      </main>

      <Footer />
      <BestSellerPopup />
    </div>
  );
}
