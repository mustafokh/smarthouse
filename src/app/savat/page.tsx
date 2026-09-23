"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  colorLabels,
  formatPrice,
  getProductByCode,
} from "@/data/products";
import { DELIVERY } from "@/data/contact";
import { InstallServiceChoice } from "@/components/InstallServiceChoice";
import { PaymentMethodChoice } from "@/components/PaymentMethodChoice";
import { SectionHeading } from "@/components/ProductCard";
import { calcNasiya, isNasiyaEligible, type PaymentMethod } from "@/lib/nasiya";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { cart, cartTotal, updateQty, removeFromCart, cartCount } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("full");
  const [needsInstall, setNeedsInstall] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isNasiyaEligible(cartTotal) && paymentMethod === "nasiya") {
      setPaymentMethod("full");
    }
  }, [cartTotal, paymentMethod]);

  const nasiya = calcNasiya(cartTotal);
  const displayTotal =
    paymentMethod === "nasiya" && nasiya.eligible
      ? nasiya.totalPayable
      : cartTotal;

  return (
    <div className="soft-page min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Savat"
          title="Sizning savatingiz"
          subtitle={
            cartCount ? `${cartCount} ta mahsulot` : "Savat hozircha bo‘sh"
          }
        />

        {cart.length === 0 ? (
          <div className="mt-12 rounded-[1.5rem] border border-dashed border-line bg-white/80 p-12 text-center">
            <p className="text-muted">Hali hech narsa qo‘shilmagan.</p>
            <Link
              href="/katalog"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-bold text-white"
            >
              Katalogga o‘tish
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <ul className="space-y-4">
              {cart.map((item) => {
                const p = getProductByCode(item.productId);
                if (!p) return null;
                const thumb =
                  p.imagesByColor?.[item.color] ?? p.image;
                return (
                  <li
                    key={`${item.productId}-${item.color}`}
                    className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-mist">
                      <Image
                        src={thumb}
                        alt={p.nameUz}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/mahsulot/${p.slug}`}
                        className="font-display font-semibold text-brand hover:text-cyan"
                      >
                        {p.nameUz}
                      </Link>
                      <p className="text-xs text-muted">
                        {p.code} · {colorLabels[item.color]}
                      </p>
                      <p className="mt-1 font-semibold">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center rounded-lg border border-line">
                        <button
                          type="button"
                          className="px-3 py-1.5 font-bold"
                          onClick={() =>
                            updateQty(item.productId, item.color, item.qty - 1)
                          }
                        >
                          –
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1.5 font-bold"
                          onClick={() =>
                            updateQty(item.productId, item.color, item.qty + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="min-w-16 text-right font-display font-bold">
                        {formatPrice(p.price * item.qty)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.productId, item.color)
                        }
                        className="text-sm text-muted hover:text-red-600"
                      >
                        O‘chirish
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit space-y-4 rounded-[1.6rem] border border-line bg-white p-6 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.14)]">
              <h2 className="font-display text-lg font-bold text-slate-900">Jami</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted">
                  <dt>Mahsulotlar</dt>
                  <dd className="font-medium text-slate-800">{formatPrice(cartTotal)}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Yetkazib berish</dt>
                  <dd className="font-medium text-slate-800">{DELIVERY.shortCart}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 font-display text-xl font-bold text-slate-900">
                  <dt>Jami</dt>
                  <dd className="text-accent">{formatPrice(displayTotal)}</dd>
                </div>
              </dl>

              <PaymentMethodChoice
                total={cartTotal}
                value={paymentMethod}
                onChange={setPaymentMethod}
                variant="light"
              />

              <InstallServiceChoice
                value={needsInstall}
                onChange={setNeedsInstall}
                variant="light"
              />

              {needsInstall === null ? (
                <p className="rounded-xl bg-accent-tint px-3 py-2 text-xs text-accent">
                  Davom etishdan oldin o‘rnatish xizmatini tanlang.
                </p>
              ) : null}

              <Link
                href={
                  needsInstall === null
                    ? "#"
                    : `/buyurtma?tolov=${paymentMethod}&ornatish=${needsInstall ? "1" : "0"}`
                }
                onClick={(e) => {
                  if (needsInstall === null) e.preventDefault();
                }}
                aria-disabled={needsInstall === null}
                className={`mt-2 block rounded-full py-3.5 text-center text-sm font-bold ${
                  needsInstall === null
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : "bg-accent text-white shadow-lg shadow-blue-500/30 hover:bg-accent-soft"
                }`}
              >
                Buyurtmani rasmiylashtirish
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
