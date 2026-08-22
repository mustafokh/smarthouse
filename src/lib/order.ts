import type { CartItem, OrderRecord } from "@/lib/store";
import { getProductByCode } from "@/data/products";

export function createOrderRecord(
  cart: CartItem[],
  data: { name: string; phone: string; address: string; note: string },
): OrderRecord {
  const total = cart.reduce((sum, item) => {
    const p = getProductByCode(item.productId);
    return sum + (p?.price ?? 0) * item.qty;
  }, 0);

  return {
    id: `SH-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    ...data,
    items: [...cart],
    total,
    status: "yangi",
  };
}
