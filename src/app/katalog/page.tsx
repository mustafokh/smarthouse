"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard, SectionHeading } from "@/components/ProductCard";
import {
  categories,
  products,
  searchProducts,
  type Protocol,
} from "@/data/products";

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="soft-page px-4 py-20 text-center text-muted">
          Yuklanmoqda…
        </div>
      }
    >
      <CatalogInner />
    </Suspense>
  );
}

function CatalogInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [protocol, setProtocol] = useState<Protocol | "all">("all");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default",
  );

  useEffect(() => {
    const q = params.get("q");
    if (q) setQuery(q);
  }, [params]);

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
    <div className="soft-page min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <SectionHeading
          title="Bizning mahsulotlar"
          subtitle="Qurilma yoki kod bo‘yicha qidiring — masalan VKL-001."
        />

        <div className="glass-panel mt-6 rounded-[1.5rem] p-4 sm:p-5">
          <label className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="text-slate-400">🔍</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Qidiruv…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
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
              className="rounded-full border border-line bg-white px-3 py-2 text-sm"
            >
              <option value="all">Protokol: hammasi</option>
              <option value="wifi">Wi-Fi</option>
              <option value="zigbee">Zigbee</option>
              <option value="yandex">Yandex</option>
            </select>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "default" | "price-asc" | "price-desc")
              }
              className="rounded-full border border-line bg-white px-3 py-2 text-sm"
            >
              <option value="default">Saralash</option>
              <option value="price-asc">Narx ↑</option>
              <option value="price-desc">Narx ↓</option>
            </select>
            <p className="ml-auto text-sm text-muted">
              {filtered.length} mahsulot
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
            Hech narsa topilmadi. Filtrni o‘zgartirib ko‘ring.
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
      className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
        active
          ? "bg-accent text-white shadow-md shadow-blue-500/25"
          : "bg-white text-slate-600 shadow-sm hover:bg-accent-tint"
      }`}
    >
      {children}
    </button>
  );
}
