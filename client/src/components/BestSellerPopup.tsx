// Design: Harajuku Confectionery — "Check out our best seller!" popup
// Appears after a short delay, slides in from bottom-left, shows best seller product
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";
import { products } from "@/lib/data";
import ReviewStars from "./ReviewStars";

export default function BestSellerPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const bestSeller = products.find(p => p.badge === "Best Seller") ?? products[0];

  useEffect(() => {
    // Check if user already dismissed this session
    const wasDismissed = sessionStorage.getItem("bestSellerDismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("bestSellerDismissed", "true");
  };

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-40 max-w-xs w-full bg-white rounded-2xl shadow-2xl border border-kawaii-pink/20 overflow-hidden"
      style={{
        animation: "fade-in-up 0.5s ease",
      }}
      role="dialog"
      aria-label="Best seller recommendation"
    >
      {/* Header */}
      <div className="bg-primary px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-bold text-primary-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          ✨ Check out our best seller!
        </span>
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-white/20 rounded-full transition-colors text-primary-foreground"
          aria-label="Dismiss popup"
        >
          <X size={16} />
        </button>
      </div>

      {/* Product Preview */}
      <Link href={`/product/${bestSeller.id}`} onClick={handleDismiss} className="block">
        <div className="flex gap-3 p-4 hover:bg-kawaii-blush/30 transition-colors">
          <img
            src={bestSeller.image}
            alt={bestSeller.name}
            className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
            loading="lazy"
          />
          <div className="flex-1">
            <h4 className="font-bold text-sm text-foreground" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              {bestSeller.name}
            </h4>
            <ReviewStars rating={5} size={12} />
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{bestSeller.hook}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-primary">${bestSeller.price.toFixed(2)}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                Best Seller
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div className="px-4 pb-4">
        <Link
          href={`/product/${bestSeller.id}`}
          onClick={handleDismiss}
          className="block w-full text-center btn-kawaii bg-primary text-primary-foreground text-sm py-2"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
