// Design: Harajuku Confectionery — Product detail page with sticky ATC
import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { products, packingVideoProduct, reviews, faqs } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewStars from "@/components/ReviewStars";
import FAQAccordion from "@/components/FAQAccordion";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag, Truck, Shield, Clock, ChevronLeft, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { withBasePath } from "@/lib/basePath";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  // Find product
  const product = id === "packing-video"
    ? { ...packingVideoProduct, badge: undefined as any, hook: "Watch us pack your order!", theme: "kawaii" as const, color: "pink", inStock: true, stockCount: 999, hasVideoOption: false, variants: [{ name: "Packing Video", price: 7.00 }], whatYouMightGet: [] as string[], comparePrice: undefined }
    : products.find(p => p.id === id);

  const [selectedVariant, setSelectedVariant] = useState("");
  const [addVideo, setAddVideo] = useState(false);
  const [showStickyATC, setShowStickyATC] = useState(false);

  useEffect(() => {
    if (product?.variants?.[0]) {
      setSelectedVariant(product.variants[0].name);
    }
  }, [product]);

  // Sticky ATC on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyATC(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="text-6xl block mb-4">🍨</span>
            <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>Product Not Found</h1>
            <p className="text-muted-foreground mb-6">This scoop seems to have melted away!</p>
            <Link href={withBasePath("/catalog")} className="btn-kawaii bg-primary text-primary-foreground text-sm">
              Back to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentPrice = product.variants?.find(v => v.name === selectedVariant)?.price ?? product.price;
  const totalPrice = currentPrice + (addVideo && product.hasVideoOption ? 7 : 0);
  const isPacking = id === "packing-video";
  const relatedProducts = products.filter(p => p.id !== id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product as any, selectedVariant, addVideo && product.hasVideoOption);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={withBasePath("/")} className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href={withBasePath("/catalog")} className="hover:text-primary transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="container pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden bg-kawaii-blush/30 border border-kawaii-pink/10">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    {product.badge}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  loading="eager"
                />
              </div>
              {/* Thumbnail strip placeholder */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${i === 1 ? "border-primary" : "border-kawaii-pink/20"} cursor-pointer hover:border-primary transition-colors`}>
                    <img src={product.image} alt="" className="w-full h-full object-cover opacity-80" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <ReviewStars rating={5} size={16} showCount count={reviews.length} />
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  ${totalPrice.toFixed(2)}
                </span>
                {product.comparePrice && (
                  <span className="text-lg text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
                )}
              </div>

              <p className="text-foreground/70 leading-relaxed">{product.description}</p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 1 && (
                <div>
                  <label className="text-sm font-bold text-foreground/80 block mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Size / Tier
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(v => (
                      <button
                        key={v.name}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${selectedVariant === v.name
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-kawaii-pink/20 text-foreground/60 hover:border-primary/40"
                          }`}
                      >
                        {v.name} — ${v.price.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Packing Video */}
              {product.hasVideoOption && (
                <label className="flex items-start gap-3 p-4 bg-kawaii-blush/50 rounded-2xl border border-kawaii-pink/15 cursor-pointer hover:bg-kawaii-blush transition-colors">
                  <input
                    type="checkbox"
                    checked={addVideo}
                    onChange={e => setAddVideo(e.target.checked)}
                    className="mt-1 accent-primary w-4 h-4"
                  />
                  <div>
                    <span className="font-semibold text-sm text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      Add Packing Video (+$7.00)
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll film your order being packed and post it on TikTok!
                    </p>
                  </div>
                </label>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full btn-kawaii bg-primary text-primary-foreground text-lg py-4 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Add to Cart — ${totalPrice.toFixed(2)}
              </button>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-kawaii-blush/30 rounded-xl">
                  <Truck size={18} className="mx-auto text-primary mb-1" />
                  <p className="text-xs text-foreground/60 font-medium">Free shipping $50+</p>
                </div>
                <div className="text-center p-3 bg-kawaii-blush/30 rounded-xl">
                  <Clock size={18} className="mx-auto text-primary mb-1" />
                  <p className="text-xs text-foreground/60 font-medium">Ships in 3-5 days</p>
                </div>
                <div className="text-center p-3 bg-kawaii-blush/30 rounded-xl">
                  <Shield size={18} className="mx-auto text-primary mb-1" />
                  <p className="text-xs text-foreground/60 font-medium">Secure checkout</p>
                </div>
              </div>

              {/* What You Might Get */}
              {product.whatYouMightGet && product.whatYouMightGet.length > 0 && (
                <div className="border border-kawaii-pink/15 rounded-2xl p-5">
                  <h3 className="font-bold text-sm text-foreground mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    🎁 What You Might Get
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.whatYouMightGet.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                        <Check size={14} className="text-kawaii-mint flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 rounded-xl">
                    <AlertTriangle size={14} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-700">
                      <strong>Mystery disclaimer:</strong> Items are randomly selected. Specific items cannot be guaranteed. That's what makes it fun!
                    </p>
                  </div>
                </div>
              )}

              {/* Packing Video Details (for packing video product) */}
              {isPacking && (
                <div className="space-y-4">
                  <div className="border border-kawaii-pink/15 rounded-2xl p-5">
                    <h3 className="font-bold text-sm text-foreground mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      📋 What You'll Receive
                    </h3>
                    <ul className="space-y-2">
                      {packingVideoProduct.details.map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                          <Check size={14} className="text-kawaii-mint flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-yellow-200 rounded-2xl p-5 bg-yellow-50/50">
                    <h3 className="font-bold text-sm text-foreground mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      ⚠️ Limitations
                    </h3>
                    <ul className="space-y-2">
                      {packingVideoProduct.limitations.map((l, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                          <span className="text-yellow-500">•</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Shipping Estimate */}
              <div className="bg-kawaii-mint/10 rounded-2xl p-4 border border-kawaii-mint/20">
                <h4 className="font-bold text-sm text-foreground mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  🚚 Shipping & Processing
                </h4>
                <p className="text-sm text-foreground/70">
                  {isPacking
                    ? "Video will be posted within 1 week of your order."
                    : "Orders are packed within 3-5 business days. Delivery takes 4-7 days within the U.S. and territories."}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 pt-16 border-t border-kawaii-pink/10">
            <h2 className="text-2xl font-bold text-foreground mb-8" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-kawaii-pink/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-kawaii-lavender/50 flex items-center justify-center text-xs font-bold text-purple-700">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-sm">{review.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <ReviewStars rating={review.rating} size={14} />
                  <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          {!isPacking && (
            <div className="mt-16 pt-16 border-t border-kawaii-pink/10">
              <h2 className="text-2xl font-bold text-foreground mb-8" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                You Might Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Cross-sell for packing video */}
          {isPacking && (
            <div className="mt-16 pt-16 border-t border-kawaii-pink/10">
              <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Pair with a Mystery Scoop!
              </h2>
              <p className="text-foreground/60 mb-8">The packing video is best enjoyed with one of our mystery scoops!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky ATC (Mobile) */}
      {showStickyATC && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-kawaii-pink/20 shadow-lg p-3 md:hidden">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>{product.name}</p>
              <p className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn-kawaii bg-primary text-primary-foreground text-sm px-6 py-3"
            >
              <ShoppingBag size={16} className="mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
