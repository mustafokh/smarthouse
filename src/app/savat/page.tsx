"use client";

import Image from "next/image";
import Link from "next/link";
import {
  colorLabels,
  formatPrice,
  getProductByCode,
} from "@/data/products";
import { DELIVERY } from "@/data/contact";
import { useStore } from "@/lib/store";
import { SectionHeading } from "@/components/ProductCard";

export default function CartPage() {
  const { cart, cartTotal, updateQty, removeFromCart, cartCount } = useStore();

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Savat"
          title="Sizning savatingiz"
          subtitle={
            cartCount
              ? `${cartCount} ta mahsulot`
              : "Savat hozircha bo‘sh"
          }
        />

        {cart.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-white/70 p-12 text-center">
            <p className="text-muted">Hali hech narsa qo‘shilmagan.</p>
            <Link
              href="/katalog"
              className="mt-6 inline-block rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-brand"
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
                return (
                  <li
                    key={`${item.productId}-${item.color}`}
                    className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-mist">
                      <Image
                        src={p.image}
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

            <aside className="h-fit rounded-2xl border border-line bg-brand p-6 text-white">
              <h2 className="font-display text-lg font-bold">Jami</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-white/80">
                  <dt>Mahsulotlar</dt>
                  <dd>{formatPrice(cartTotal)}</dd>
                </div>
                <div className="flex justify-between text-white/80">
                  <dt>Yetkazib berish</dt>
                  <dd>{DELIVERY.shortCart}</dd>
                </div>
                <div className="flex justify-between border-t border-white/15 pt-3 font-display text-xl font-bold">
                  <dt>Jami</dt>
                  <dd className="text-cyan">{formatPrice(cartTotal)}</dd>
                </div>
              </dl>
              <Link
                href="/buyurtma"
                className="mt-6 block rounded-xl bg-cyan py-3.5 text-center text-sm font-bold text-brand hover:bg-cyan-soft"
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
