"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ColorDots,
  ProductCard,
  SectionHeading,
} from "@/components/ProductCard";
import {
  colorLabels,
  formatPrice,
  getCategoryBySlug,
  products,
  type Product,
  type ProductColor,
} from "@/data/products";
import { OWNER_PHONE } from "@/data/contact";
import { useStore } from "@/lib/store";

export function ProductDetail({ product }: { product: Product }) {
  const cat = getCategoryBySlug(product.category);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [color, setColor] = useState<ProductColor>(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = useMemo(
    () =>
      products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4),
    [product],
  );

  const wish = isWishlisted(product.id);
  const displayImage = product.imagesByColor?.[color] ?? product.image;

  return (
    <div className="soft-page min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <nav className="text-sm text-muted">
          <Link href="/katalog" className="hover:text-accent">
            Katalog
          </Link>
          {cat && (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/kategoriya/${cat.slug}`}
                className="hover:text-accent"
              >
                {cat.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-slate-800">{product.code}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-[0_16px_48px_-20px_rgba(15,23,42,0.18)]">
            <Image
              key={displayImage}
              src={displayImage}
              alt={product.nameUz}
              fill
              className="object-contain p-8 sm:p-12"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {product.code} · {product.protocol}
                </p>
                <h1 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-4xl">
                  {product.nameUz}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${
                  wish ? "text-rose-500" : "text-slate-400"
                }`}
                aria-label="Sevimli"
              >
                ♥
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-4">
              <p className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {formatPrice(product.price)}
              </p>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                ★ 4.8 · sifatli
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.specs.slice(0, 4).map((s) => (
                <div
                  key={s}
                  className="rounded-2xl bg-accent-tint px-3 py-3 text-center"
                >
                  <p className="text-[11px] font-semibold leading-snug text-accent">
                    {s}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-800">
                Rang — {colorLabels[color]}
              </p>
              <div className="mt-3">
                <ColorDots
                  colors={product.colors}
                  value={color}
                  onChange={setColor}
                  imagesByColor={product.imagesByColor}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-800">Miqdor</p>
              <div className="mt-2 inline-flex items-center rounded-full bg-white shadow-sm">
                <button
                  type="button"
                  className="px-4 py-2 text-lg font-bold text-slate-700"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  –
                </button>
                <span className="min-w-10 text-center font-semibold">{qty}</span>
                <button
                  type="button"
                  className="px-4 py-2 text-lg font-bold text-slate-700"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, color, qty);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-accent-soft"
              >
                {added ? "Qo‘shildi ✓" : "Savatga qo‘shish"}
              </button>
              <Link
                href="/aloqa"
                className="rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Konsultatsiya
              </Link>
              <a
                href={OWNER_PHONE.telHref}
                className="rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-slate-700"
              >
                {OWNER_PHONE.display}
              </a>
            </div>

            <ul className="mt-10 space-y-3 rounded-[1.5rem] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Texnik xususiyatlar</p>
              {product.specs.map((s) => (
                <li
                  key={s}
                  className="flex justify-between gap-4 border-b border-line/80 pb-2 text-sm last:border-0 last:pb-0"
                >
                  <span className="text-muted">Spec</span>
                  <span className="font-medium text-slate-800">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <SectionHeading title="O‘xshash mahsulotlar" />
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
