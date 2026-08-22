"use client";

import { useMemo, useState } from "react";
import { ProductCard, SectionHeading } from "@/components/ProductCard";
import {
  categories,
  products,
  searchProducts,
  type Protocol,
} from "@/data/products";

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [protocol, setProtocol] = useState<Protocol | "all">("all");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default",
  );

  const filtered = useMemo(() => {
    let list = searchProducts(query);
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (protocol !== "all") {
      list = list.filter((p) => p.protocol === protocol);
    }
    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [query, category, protocol, sort]);

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Vitrina"
          title="Katalog"
          subtitle="Qurilma yoki kod bo‘yicha qidiring — masalan VKL-001."
        />

        <div className="mt-8 rounded-2xl border border-line bg-surface/95 p-4 shadow-sm sm:p-5">
          <label className="block">
            <span className="sr-only">Qidiruv</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Qurilma yoki kod toping… VKL-001"
              className="w-full rounded-xl border border-line bg-fog px-4 py-3 text-sm outline-none ring-cyan/40 focus:ring-2"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip
              active={category === "all"}
              onClick={() => setCategory("all")}
            >
              Barchasi
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.name}
              </FilterChip>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              value={protocol}
              onChange={(e) =>
                setProtocol(e.target.value as Protocol | "all")
              }
              className="rounded-lg border border-line bg-white px-3 py-2 text-sm"
            >
              <option value="all">Protokol: hammasi</option>
              <option value="wifi">Wi-Fi</option>
              <option value="zigbee">Zigbee</option>
            </select>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "default" | "price-asc" | "price-desc")
              }
              className="rounded-lg border border-line bg-white px-3 py-2 text-sm"
            >
              <option value="default">Saralash</option>
              <option value="price-asc">Narx ↑</option>
              <option value="price-desc">Narx ↓</option>
            </select>
            <p className="ml-auto text-sm text-muted">
              {filtered.length} / {products.length} mahsulot
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted">
            Hech narsa topilmadi. Boshqa kalit so‘z yoki filtrni sinab ko‘ring.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-brand text-white"
          : "bg-mist text-brand hover:bg-cyan/20"
      }`}
    >
      {children}
    </button>
  );
}
