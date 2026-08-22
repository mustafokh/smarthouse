"use client";

import Link from "next/link";
import { ProductCard, SectionHeading } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Sevimlilar"
          title="Saqlangan mahsulotlar"
          subtitle={`${items.length} ta qurilma`}
        />
        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-white/70 p-12 text-center">
            <p className="text-muted">Sevimlilar bo‘sh.</p>
            <Link
              href="/katalog"
              className="mt-6 inline-block rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-brand"
            >
              Katalog
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
