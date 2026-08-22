"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductColor } from "@/data/products";
import { getProductByCode, products } from "@/data/products";

export interface CartItem {
  productId: string;
  color: ProductColor;
  qty: number;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  items: CartItem[];
  total: number;
  status: "yangi" | "ko'rib chiqilmoqda" | "tasdiqlangan";
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  orders: OrderRecord[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: string, color: ProductColor, qty?: number) => void;
  removeFromCart: (productId: string, color: ProductColor) => void;
  updateQty: (productId: string, color: ProductColor, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  placeOrder: (data: {
    name: string;
    phone: string;
    address: string;
    note: string;
  }) => OrderRecord;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "sh777_cart";
const WISH_KEY = "sh777_wishlist";
const ORDERS_KEY = "sh777_orders";

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(loadJSON(CART_KEY, []));
    setWishlist(loadJSON(WISH_KEY, []));
    setOrders(loadJSON(ORDERS_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  const addToCart = useCallback(
    (productId: string, color: ProductColor, qty = 1) => {
      setCart((prev) => {
        const i = prev.findIndex(
          (x) => x.productId === productId && x.color === color,
        );
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        }
        return [...prev, { productId, color, qty }];
      });
    },
    [],
  );

  const removeFromCart = useCallback(
    (productId: string, color: ProductColor) => {
      setCart((prev) =>
        prev.filter((x) => !(x.productId === productId && x.color === color)),
      );
    },
    [],
  );

  const updateQty = useCallback(
    (productId: string, color: ProductColor, qty: number) => {
      if (qty < 1) {
        removeFromCart(productId, color);
        return;
      }
      setCart((prev) =>
        prev.map((x) =>
          x.productId === productId && x.color === color ? { ...x, qty } : x,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const placeOrder = useCallback(
    (data: {
      name: string;
      phone: string;
      address: string;
      note: string;
    }) => {
      const total = cart.reduce((sum, item) => {
        const p = getProductByCode(item.productId);
        return sum + (p?.price ?? 0) * item.qty;
      }, 0);
      const order: OrderRecord = {
        id: `SH-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        ...data,
        items: [...cart],
        total,
        status: "yangi",
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    [cart],
  );

  const cartCount = useMemo(
    () => cart.reduce((n, i) => n + i.qty, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const p = products.find((x) => x.id === item.productId);
        return sum + (p?.price ?? 0) * item.qty;
      }, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      orders,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      placeOrder,
    }),
    [
      cart,
      wishlist,
      orders,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      placeOrder,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
