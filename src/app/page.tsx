"use client";

import Link from "next/link";
import { CategorySticker } from "@/components/CategorySticker";
import { HeroProductCarousel } from "@/components/HeroProductCarousel";
import { ProductCard, SectionHeading } from "@/components/ProductCard";
import { categories, getFeaturedProducts, products } from "@/data/products";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const { t, categoryName } = useI18n();

  return (
    <div className="soft-page">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <section className="promo-banner animate-rise relative overflow-hidden rounded-[1.5rem] text-white shadow-[0_20px_50px_-20px_rgba(37,99,235,0.55)] sm:rounded-[1.75rem]">
          <div
            className="pointer-events-none absolute -right-8 top-0 h-48 w-48 rounded-full bg-white/15 blur-2xl sm:h-64 sm:w-64"
            aria-hidden
          />
          <div className="relative px-4 pt-5 sm:px-8 sm:pt-7">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
              {t("hero_eyebrow")}
            </p>
            <h1 className="mt-2 text-center font-display text-[1.55rem] font-extrabold leading-tight sm:text-4xl">
              {t("hero_title_1")}
              <span className="block">{t("hero_title_2")}</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-white/85 sm:mt-3 sm:text-base">
              {t("hero_sub")}
            </p>
          </div>

          <div className="relative mt-3 px-2 pb-3 sm:mt-4 sm:px-4 sm:pb-4">
            <HeroProductCarousel />
          </div>
        </section>

        <form action="/katalog" className="animate-rise-delay mt-5">
          <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3.5">
            <SearchIcon />
            <input
              name="q"
              type="search"
              placeholder={t("search_placeholder")}
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>
        </form>

        <section className="animate-rise-delay-2 mt-10">
          <div className="flex items-end justify-between gap-3">
            <SectionHeading title={t("categories")} />
            <Link
              href="/katalog"
              className="text-sm font-semibold text-accent hover:underline"
            >
              {t("all")}
            </Link>
          </div>
          <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/kategoriya/${cat.slug}`}
                className="group flex w-[5.75rem] shrink-0 flex-col items-center gap-2.5"
              >
                <CategorySticker
                  categoryId={cat.id}
                  className="transition duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                />
                <span className="line-clamp-2 text-center text-[11px] font-semibold leading-tight text-slate-700">
                  {categoryName(cat.id, cat.name)}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading
              title={t("our_products")}
              subtitle={t("products_sub", { n: products.length })}
            />
            <Link
              href="/katalog"
              className="text-sm font-semibold text-accent hover:underline"
            >
              {t("more")}
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="mt-14 soft-card flex flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              {t("cta_title")}
            </h2>
            <p className="mt-1 text-sm text-muted">{t("cta_sub")}</p>
          </div>
          <Link
            href="/katalog"
            className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-accent-soft"
          >
            {t("cta_btn")}
          </Link>
        </section>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-slate-400"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
