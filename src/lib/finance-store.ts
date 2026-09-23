import { promises as fs } from "fs";
import path from "path";
import type { OrderRecord } from "@/lib/store";

export interface ExpenseRecord {
  id: string;
  amount: number;
  note: string;
  createdAt: string;
}

export interface FinanceStore {
  orders: OrderRecord[];
  expenses: ExpenseRecord[];
  /** Chat IDs that ran /start and may receive order notifications */
  adminChatIds?: string[];
  /** Stock by "PRODUCT_ID:color" -> qty */
  stock?: Record<string, number>;
  updatedAt: string;
}

const STORE_KEY = "smarthouse:finance";
const EMPTY: FinanceStore = {
  orders: [],
  expenses: [],
  adminChatIds: [],
  updatedAt: new Date(0).toISOString(),
};

function localPath() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "smarthouse-finance.json");
  }
  return path.join(process.cwd(), "data", "finance-store.json");
}

async function redisGet(): Promise<FinanceStore | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}/get/${STORE_KEY}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: string | null };
  if (!data.result) return null;
  try {
    return JSON.parse(data.result) as FinanceStore;
  } catch {
    return null;
  }
}

async function redisSet(store: FinanceStore): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  const res = await fetch(`${url}/set/${STORE_KEY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(store),
  });
  return res.ok;
}

async function fileGet(): Promise<FinanceStore> {
  try {
    const raw = await fs.readFile(localPath(), "utf8");
    return JSON.parse(raw) as FinanceStore;
  } catch {
    return { ...EMPTY, orders: [], expenses: [] };
  }
}

async function fileSet(store: FinanceStore): Promise<void> {
  const file = localPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2), "utf8");
}

export async function loadFinanceStore(): Promise<FinanceStore> {
  const fromRedis = await redisGet();
  if (fromRedis) return fromRedis;
  return fileGet();
}

export async function saveFinanceStore(store: FinanceStore): Promise<void> {
  store.updatedAt = new Date().toISOString();
  const ok = await redisSet(store);
  if (!ok) await fileSet(store);
}

export async function appendOrder(order: OrderRecord): Promise<void> {
  const store = await loadFinanceStore();
  if (store.orders.some((o) => o.id === order.id)) return;
  store.orders.unshift(order);
  store.orders = store.orders.slice(0, 2000);
  // Decrement sklad on sale
  if (!store.stock) store.stock = {};
  for (const item of order.items) {
    const key = stockKey(item.productId, item.color);
    const current = store.stock[key] ?? DEFAULT_STOCK;
    store.stock[key] = Math.max(0, current - item.qty);
  }
  await saveFinanceStore(store);
}

export const DEFAULT_STOCK = 20;

export function stockKey(productId: string, color: string): string {
  return `${productId}:${color}`;
}

export async function getStockMap(): Promise<Record<string, number>> {
  const store = await loadFinanceStore();
  return store.stock ?? {};
}

export async function setStockQty(
  productId: string,
  color: string,
  qty: number,
): Promise<number> {
  const store = await loadFinanceStore();
  if (!store.stock) store.stock = {};
  const key = stockKey(productId, color);
  store.stock[key] = Math.max(0, Math.floor(qty));
  await saveFinanceStore(store);
  return store.stock[key];
}

export async function adjustStockQty(
  productId: string,
  color: string,
  delta: number,
): Promise<number> {
  const store = await loadFinanceStore();
  if (!store.stock) store.stock = {};
  const key = stockKey(productId, color);
  const current = store.stock[key] ?? DEFAULT_STOCK;
  store.stock[key] = Math.max(0, current + delta);
  await saveFinanceStore(store);
  return store.stock[key];
}

export function resolveStockQty(
  stock: Record<string, number> | undefined,
  productId: string,
  color: string,
): number {
  const key = stockKey(productId, color);
  if (stock && key in stock) return stock[key];
  return DEFAULT_STOCK;
}

export async function appendExpense(
  amount: number,
  note: string,
): Promise<ExpenseRecord> {
  const store = await loadFinanceStore();
  const expense: ExpenseRecord = {
    id: `EX-${Date.now().toString(36).toUpperCase()}`,
    amount,
    note: note.trim() || "Chiqim",
    createdAt: new Date().toISOString(),
  };
  store.expenses.unshift(expense);
  store.expenses = store.expenses.slice(0, 2000);
  await saveFinanceStore(store);
  return expense;
}

export async function rememberAdminChatId(chatId: string | number): Promise<void> {
  const id = String(chatId);
  const store = await loadFinanceStore();
  const existing = store.adminChatIds ?? [];
  if (existing.includes(id)) return;
  store.adminChatIds = [...existing, id].slice(-20);
  await saveFinanceStore(store);
}

export async function getAdminChatIds(): Promise<string[]> {
  const store = await loadFinanceStore();
  return store.adminChatIds ?? [];
}

function inMonth(iso: string, year: number, month: number): boolean {
  const d = new Date(iso);
  return d.getFullYear() === year && d.getMonth() + 1 === month;
}

export function computeStats(
  store: FinanceStore,
  year?: number,
  month?: number,
) {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth() + 1;

  const monthOrders = store.orders.filter((o) =>
    inMonth(o.createdAt, y, m),
  );
  const monthExpenses = store.expenses.filter((e) =>
    inMonth(e.createdAt, y, m),
  );

  const allIncome = store.orders.reduce((s, o) => s + o.total, 0);
  const allExpense = store.expenses.reduce((s, e) => s + e.amount, 0);
  const monthIncome = monthOrders.reduce((s, o) => s + o.total, 0);
  const monthExpense = monthExpenses.reduce((s, e) => s + e.amount, 0);

  const productQty = new Map<string, { qty: number; revenue: number; name: string }>();
  for (const order of store.orders) {
    for (const item of order.items) {
      const key = item.productId;
      const prev = productQty.get(key) ?? {
        qty: 0,
        revenue: 0,
        name: item.productId,
      };
      // revenue approximated later by caller with product prices if needed
      prev.qty += item.qty;
      productQty.set(key, prev);
    }
  }

  return {
    year: y,
    month: m,
    totalOrders: store.orders.length,
    totalIncome: allIncome,
    totalExpense: allExpense,
    balance: allIncome - allExpense,
    monthOrders: monthOrders.length,
    monthIncome,
    monthExpense,
    monthBalance: monthIncome - monthExpense,
    monthOrderList: monthOrders,
    monthExpenseList: monthExpenses,
    recentOrders: store.orders.slice(0, 10),
    recentExpenses: store.expenses.slice(0, 10),
    productQty,
  };
}
