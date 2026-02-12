import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/lib/data";

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
  addPackingVideo: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: string, addVideo: boolean) => void;
  removeItem: (productId: string, variant: string) => void;
  updateQuantity: (productId: string, variant: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedTime: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedTime, setLastAddedTime] = useState(0);

  const addItem = useCallback((product: Product, variant: string, addVideo: boolean) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.variant === variant);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.variant === variant
            ? { ...i, quantity: i.quantity + 1, addPackingVideo: addVideo }
            : i
        );
      }
      return [...prev, { product, variant, quantity: 1, addPackingVideo: addVideo }];
    });
    setIsCartOpen(true);
    setLastAddedTime(Date.now());
  }, []);

  const removeItem = useCallback((productId: string, variant: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.variant === variant)));
  }, []);

  const updateQuantity = useCallback((productId: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variant);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.variant === variant
          ? { ...i, quantity }
          : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const variantData = i.product.variants?.find(v => v.name === i.variant);
    const price = variantData?.price ?? i.product.price;
    const videoPrice = i.addPackingVideo ? 7 : 0;
    return sum + (price + videoPrice) * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice, isCartOpen, setIsCartOpen,
      lastAddedTime,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
