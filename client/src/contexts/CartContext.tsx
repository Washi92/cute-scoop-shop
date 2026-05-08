import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/lib/data";

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
  addPackingVideo: boolean;
}

export interface CompletedOrder {
  items: CartItem[];
  totalPrice: number;
  customerInfo: CustomerInfo;
  orderId: string;
  date: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
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
  saveLastOrder: (customerInfo: CustomerInfo) => string;
  getLastOrder: () => CompletedOrder | null;
}

const CART_STORAGE_KEY = "cute-scoop-cart";
const ORDER_STORAGE_KEY = "cute-scoop-last-order";

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // If parsing fails, start fresh
  }
  return [];
}

function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage might be full or unavailable
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedTime, setLastAddedTime] = useState(0);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

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

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const variantData = i.product.variants?.find(v => v.name === i.variant);
    const price = variantData?.price ?? i.product.price;
    const videoPrice = i.addPackingVideo ? 7 : 0;
    return sum + (price + videoPrice) * i.quantity;
  }, 0);

  const saveLastOrder = useCallback((customerInfo: CustomerInfo): string => {
    const orderId = `CS-${Date.now().toString(36).toUpperCase()}`;
    const order: CompletedOrder = {
      items: [...items],
      totalPrice,
      customerInfo,
      orderId,
      date: new Date().toISOString(),
    };
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    } catch {
      // Ignore storage errors
    }
    return orderId;
  }, [items, totalPrice]);

  const getLastOrder = useCallback((): CompletedOrder | null => {
    try {
      const stored = localStorage.getItem(ORDER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore
    }
    return null;
  }, []);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice, isCartOpen, setIsCartOpen,
      lastAddedTime, saveLastOrder, getLastOrder,
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
