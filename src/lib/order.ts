import type { CartItem, OrderRecord } from "@/lib/store";
import { getProductByCode } from "@/data/products";
import {
  calcNasiya,
  normalizeNasiyaMonths,
  toNasiyaPlan,
  type NasiyaMonths,
  type PaymentMethod,
} from "@/lib/nasiya";

export function createOrderRecord(
  cart: CartItem[],
  data: { name: string; phone: string; address: string; note: string },
  paymentMethod: PaymentMethod = "full",
  needsInstall = false,
  nasiyaMonths: NasiyaMonths = 3,
): OrderRecord {
  const total = cart.reduce((sum, item) => {
    const p = getProductByCode(item.productId);
    return sum + (p?.price ?? 0) * item.qty;
  }, 0);

  const months = normalizeNasiyaMonths(nasiyaMonths);
  const nasiya = calcNasiya(total, months);
  const method: PaymentMethod =
    paymentMethod === "nasiya" && nasiya.eligible ? "nasiya" : "full";

  return {
    id: `SH-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    ...data,
    items: [...cart],
    total,
    status: "yangi",
    paymentMethod: method,
    nasiyaPlan: method === "nasiya" ? toNasiyaPlan(nasiya) : undefined,
    needsInstall,
  };
}
