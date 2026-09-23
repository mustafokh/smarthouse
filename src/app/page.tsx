import Image from "next/image";
import Link from "next/link";
import { ProductCard, SectionHeading } from "@/components/ProductCard";
import { categories, getFeaturedProducts, products } from "@/data/products";

const CAT_ICON: Record<string, string> = {
  viklyuchatellar: "⚡",
  rele: "🔌",
  sensorlar: "📡",
  shlyuzlar: "🏠",
  karnizlar: "🪟",
  iqlim: "🌡️",
  yoritish: "💡",
  kolonkalar: "🔊",
};

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="soft-page">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        {/* Promo banner — Smarto style */}
        <section className="promo-banner animate-rise relative overflow-hidden rounded-[1.75rem] px-6 py-8 text-white shadow-[0_20px_50px_-20px_rgba(37,99,235,0.55)] sm:px-10 sm:py-10">
          <div
            className="pointer-events-none absolute -right-6 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/15 blur-2xl sm:h-56 sm:w-56"
            aria-hidden
          />
          <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                smart.house777
              </p>
              <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                SMART LIVING
                <span className="block">STARTS HERE</span>
              </h1>
              <p className="mt-3 text-sm text-white/85 sm:text-base">
                Zigbee, Wi-Fi va smart kolonkalr — professional katalog.
              </p>
              <Link
                href="/katalog"
                className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-accent shadow-lg transition hover:bg-slate-50"
              >
                Katalogni ochish
              </Link>
            </div>
            <div className="relative h-36 w-36 shrink-0 animate-float sm:h-44 sm:w-44">
              <div className="absolute inset-0 rounded-[2rem] bg-white/20 backdrop-blur-sm" />
              <Image
                src="/logo-mark.png"
                alt=""
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </section>

        {/* Search */}
        <form action="/katalog" className="animate-rise-delay mt-5">
          <label className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3.5">
            <SearchIcon />
            <input
              name="q"
              type="search"
              placeholder="Mahsulot yoki kod qidiring…"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>
        </form>

        {/* Categories */}
        <section className="animate-rise-delay-2 mt-10">
          <div className="flex items-end justify-between gap-3">
            <SectionHeading title="Kategoriyalar" />
            <Link
              href="/katalog"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Barchasi
            </Link>
          </div>
          <div className="mt-5 flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/kategoriya/${cat.slug}`}
                className="flex w-[5.5rem] shrink-0 flex-col items-center gap-2"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-2xl shadow-[0_10px_28px_-12px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_rgba(59,130,246,0.3)]">
                  {CAT_ICON[cat.id] ?? "📦"}
                </span>
                <span className="line-clamp-2 text-center text-[11px] font-medium leading-tight text-slate-600">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading
              title="Bizning mahsulotlar"
              subtitle={`${products.length} ta qurilma — tanlang va buyurtma bering.`}
            />
            <Link
              href="/katalog"
              className="text-sm font-semibold text-accent hover:underline"
            >
              Ko‘proq →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Soft CTA */}
        <section className="mt-14 soft-card flex flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              Toshkent bo‘ylab yetkazish bepul
            </h2>
            <p className="mt-1 text-sm text-muted">
              Nasiya, o‘rnatish xizmati va tez buyurtma — barchasi bir joyda.
            </p>
          </div>
          <Link
            href="/katalog"
            className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-accent-soft"
          >
            Xaridni boshlash
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
