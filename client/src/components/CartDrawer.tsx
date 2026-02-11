// Design: Harajuku Confectionery — slide-out cart with kawaii styling
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "wouter";
import { toast } from "sonner";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "fade-in-up 0.3s ease" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-kawaii-pink/20">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            <ShoppingBag size={20} />
            Your Cart ({totalItems})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-kawaii-blush rounded-full transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-5xl mb-4">🍨</span>
              <p className="text-lg font-semibold text-foreground/70 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Your cart is empty
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Add some mystery scoops to get started!
              </p>
              <Link
                href="/catalog"
                onClick={onClose}
                className="btn-kawaii bg-primary text-primary-foreground text-sm"
              >
                Shop Mystery Scoops
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const variantData = item.product.variants?.find(v => v.name === item.variant);
                const unitPrice = variantData?.price ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${item.variant}`} className="flex gap-4 p-3 bg-kawaii-blush/30 rounded-2xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                      {item.addPackingVideo && (
                        <p className="text-xs text-kawaii-coral mt-1">+ Packing Video ($7.00)</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-white rounded-full border border-kawaii-pink/20 px-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant, item.quantity - 1)}
                            className="p-1 hover:text-primary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.variant, item.quantity + 1)}
                            className="p-1 hover:text-primary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-primary">
                            ${((unitPrice + (item.addPackingVideo ? 7 : 0)) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id, item.variant)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-kawaii-pink/20 px-6 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Subtotal</span>
              <span className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping calculated at checkout</p>
            <button
              onClick={() => toast.success("Checkout feature coming soon!")}
              className="w-full btn-kawaii bg-primary text-primary-foreground text-base py-3"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors text-center py-1"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
