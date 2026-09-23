"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  colorLabels,
  formatPrice,
  getProductByCode,
} from "@/data/products";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ProductCard";

function OrdersInner() {
  const { orders } = useStore();
  const params = useSearchParams();
  const ok = params.get("ok");

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Profil"
          title="Buyurtmalarim"
          subtitle="Telegram bot dizaynidagi «Mening buyurtmalarim» — lokal saqlash."
        />

        {ok && (
          <div className="mt-6 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 text-sm text-brand">
            Buyurtma qabul qilindi: <strong>{ok}</strong>. Tez orada bog‘lanamiz.
          </div>
        )}

        {orders.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-white/70 p-10 text-center">
            <p className="text-muted">Hali buyurtma yo‘q.</p>
            <Link
              href="/katalog"
              className="mt-4 inline-block text-sm font-semibold text-cyan"
            >
              Katalogga →
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((o) => (
              <li
                key={o.id}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display font-bold text-brand">{o.id}</p>
                    <p className="text-xs text-muted">
                      {new Date(o.createdAt).toLocaleString("uz-UZ")}
                    </p>
                  </div>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-brand">
                    {o.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">
                  {o.name} · {o.phone}
                  {o.address ? ` · ${o.address}` : ""}
                </p>
                <ul className="mt-3 space-y-1 text-sm">
                  {o.items.map((item) => {
                    const p = getProductByCode(item.productId);
                    return (
                      <li key={`${item.productId}-${item.color}`}>
                        {p?.nameUz ?? item.productId} ·{" "}
                        {colorLabels[item.color]} ×{item.qty}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 font-display text-lg font-bold text-brand">
                  {formatPrice(
                    o.paymentMethod === "nasiya" && o.nasiyaPlan
                      ? o.nasiyaPlan.totalPayable
                      : o.total,
                  )}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {o.paymentMethod === "nasiya" && o.nasiyaPlan
                    ? `Nasiya: bosh ${formatPrice(o.nasiyaPlan.downPayment)} · oyiga ${formatPrice(o.nasiyaPlan.monthlyWithFee)} × ${o.nasiyaPlan.months}`
                    : "To‘liq to‘lov"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Yuklanmoqda…</div>}>
      <OrdersInner />
    </Suspense>
  );
}
