import Image from "next/image";
import Link from "next/link";
import { ProductCard, SectionHeading } from "@/components/ProductCard";
import { categories, getFeaturedProducts, products } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Full-bleed hero — brand first */}
      <section className="bg-hero relative min-h-[92vh] overflow-hidden text-white">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-cyan/30 blur-3xl animate-pulse-soft"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-10 left-10 h-56 w-56 rounded-full bg-cyan/20 blur-3xl animate-drift"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-35deg, transparent, transparent 22px, rgba(47,182,217,0.12) 22px, rgba(47,182,217,0.12) 23px)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-12">
          <div className="max-w-xl lg:max-w-2xl">
            <p className="animate-rise font-display text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
              smart.house777
            </p>
            <h1 className="animate-rise-delay mt-4 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Uyingizni
              <span className="block text-cyan">aqlli boshqaring</span>
            </h1>
            <p className="animate-rise-delay-2 mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              Karnizlar, Zigbee shlyuzlar, sensorlar va sensorni viklyuchatellar
              — professional katalogdan tanlang va buyurtma bering.
            </p>
            <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-3">
              <Link
                href="/katalog"
                className="rounded-xl bg-cyan px-7 py-3.5 text-sm font-bold text-brand shadow-lg shadow-cyan/25 transition hover:bg-cyan-soft"
              >
                Katalogni ochish
              </Link>
              <Link
                href="/aloqa"
                className="rounded-xl border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Konsultatsiya
              </Link>
            </div>
          </div>

          <div className="relative mt-14 hidden flex-1 lg:mt-0 lg:block">
              <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-8 rounded-full border border-cyan/30 animate-pulse-soft" />
              <div className="absolute inset-16 rounded-full border border-white/10" />
              <div className="absolute inset-[22%] overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_-20px_rgba(47,182,217,0.45)] animate-drift">
                <Image
                  src="/logo-mark.png"
                  alt="smart.house777 logo"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-circuit border-b border-line py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Kategoriyalar"
            title="Nimani qidiryapsiz?"
            subtitle="Dizayn faylidagi vitrina logikasi: kategoriyalar bo‘yicha tez tanlash."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/kategoriya/${cat.slug}`}
                className="group rounded-2xl border border-line bg-surface/90 p-6 transition hover:border-cyan hover:shadow-[0_12px_40px_-24px_rgba(47,182,217,0.6)]"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan">
                  {cat.icon}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-brand group-hover:text-brand">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-cyan">
                  Ko‘rish →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Tanlangan"
              title="Mashhur qurilmalar"
              subtitle={`${products.length} ta mahsulot — to‘liq prayslistdan.`}
            />
            <Link
              href="/katalog"
              className="text-sm font-semibold text-cyan hover:underline"
            >
              Barchasini ko‘rish →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-y border-line bg-brand py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="font-display text-3xl font-bold">
              Buyurtma berish oson
            </h2>
            <p className="mt-2 max-w-lg text-white/70">
              Savatga qo‘shing, ma’lumotlaringizni qoldiring.{" "}
              Toshkent shahar bo‘ylab yetkazib berish — bepul.
            </p>
          </div>
          <Link
            href="/katalog"
            className="shrink-0 rounded-xl bg-cyan px-7 py-3.5 text-sm font-bold text-brand hover:bg-cyan-soft"
          >
            Xaridni boshlash
          </Link>
        </div>
      </section>
    </>
  );
}
