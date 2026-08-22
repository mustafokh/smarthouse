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
        .slice(0, 3),
    [product],
  );

  const wish = isWishlisted(product.id);

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="text-sm text-muted">
          <Link href="/katalog" className="hover:text-cyan">
            Katalog
          </Link>
          {cat && (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/kategoriya/${cat.slug}`}
                className="hover:text-cyan"
              >
                {cat.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-brand">{product.code}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-white to-mist">
            <Image
              src={product.image}
              alt={product.nameUz}
              fill
              className="object-contain p-8"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              {product.code} · {product.protocol}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-brand sm:text-4xl">
              {product.nameUz}
            </h1>
            <p className="mt-2 text-sm text-muted">{product.name}</p>
            <p className="mt-6 font-display text-4xl font-extrabold text-brand">
              {formatPrice(product.price)}
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold text-brand">
                Rang — {colorLabels[color]}
              </p>
              <div className="mt-3">
                <ColorDots
                  colors={product.colors}
                  value={color}
                  onChange={setColor}
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-brand">Miqdor</p>
              <div className="mt-2 inline-flex items-center rounded-xl border border-line bg-white">
                <button
                  type="button"
                  className="px-4 py-2 text-lg font-bold text-brand"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  –
                </button>
                <span className="min-w-10 text-center font-semibold">{qty}</span>
                <button
                  type="button"
                  className="px-4 py-2 text-lg font-bold text-brand"
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
                className="rounded-xl bg-cyan px-6 py-3.5 text-sm font-bold text-brand shadow-md shadow-cyan/20 hover:bg-cyan-soft"
              >
                {added ? "Qo‘shildi ✓" : "Savatga qo‘shish"}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`rounded-xl border px-6 py-3.5 text-sm font-semibold ${
                  wish
                    ? "border-cyan bg-cyan/10 text-brand"
                    : "border-line text-brand hover:border-cyan"
                }`}
              >
                {wish ? "Sevimlilarda" : "Sevimlilarga"}
              </button>
              <Link
                href="/aloqa"
                className="rounded-xl border border-brand/20 bg-brand px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-deep"
              >
                Konsultatsiya
              </Link>
              <a
                href={OWNER_PHONE.telHref}
                className="rounded-xl border border-cyan px-6 py-3.5 text-sm font-semibold text-brand hover:bg-cyan/10"
              >
                {OWNER_PHONE.display}
              </a>
            </div>

            <ul className="mt-10 space-y-2 rounded-2xl border border-line bg-white/80 p-5">
              {product.specs.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-muted">
                  <span className="text-cyan">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <SectionHeading title="O‘xshash mahsulotlar" />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
