"use client";

import Image from "next/image";
import Link from "next/link";
import {
  colorLabels,
  formatPrice,
  type Product,
  type ProductColor,
} from "@/data/products";
import { useStore } from "@/lib/store";

/** Deterministic fake rating for UI polish (Smarto-style cards). */
function ratingFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * 17) % 40;
  return (4.6 + h / 100).toFixed(1);
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wish = isWishlisted(product.id);
  const defaultColor = product.colors[0];
  const rating = ratingFor(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_12px_36px_-16px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-16px_rgba(59,130,246,0.28)]">
      <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
        <StarIcon />
        {rating}
      </div>
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition ${
          wish ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
        }`}
        aria-label="Sevimlilarga"
      >
        <HeartIcon filled={wish} />
      </button>

      <Link
        href={`/mahsulot/${product.slug}`}
        className="relative mx-3 mt-10 block aspect-square"
      >
        <Image
          src={product.image}
          alt={product.nameUz}
          fill
          className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:768px) 50vw, 25vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-1">
        <Link href={`/mahsulot/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-[15px] font-semibold leading-snug text-slate-800">
            {product.nameUz}
          </h3>
        </Link>
        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="font-display text-lg font-bold text-slate-900">
            {formatPrice(product.price)}
          </p>
          <button
            type="button"
            onClick={() => addToCart(product.id, defaultColor)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-accent-soft hover:scale-105"
            aria-label="Savatga"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden>
      <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19.5l1-5.8L3.6 9.6l5.8-.8L12 3.5z" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden
    >
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const COLOR_SWATCH: Record<ProductColor, string> = {
  white: "#f5f7fa",
  black: "#1a1a1a",
  gold: "#c9a227",
  gray: "#8a93a0",
  rgb: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
  yellow: "#e8b923",
  pink: "#d94f8c",
  teal: "#2aa8a0",
};

export function ColorDots({
  colors,
  value,
  onChange,
  imagesByColor,
}: {
  colors: ProductColor[];
  value: ProductColor;
  onChange: (c: ProductColor) => void;
  imagesByColor?: Partial<Record<ProductColor, string>>;
}) {
  const useStickers =
    !!imagesByColor && colors.some((c) => Boolean(imagesByColor[c]));

  if (useStickers && imagesByColor) {
    return (
      <ColorStickers
        colors={colors}
        value={value}
        onChange={onChange}
        imagesByColor={imagesByColor}
      />
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          title={colorLabels[c]}
          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition ${
            value === c ? "scale-110 border-accent" : "border-line"
          }`}
          style={{ background: COLOR_SWATCH[c] }}
          aria-label={colorLabels[c]}
        />
      ))}
    </div>
  );
}

export function ColorStickers({
  colors,
  value,
  onChange,
  imagesByColor,
}: {
  colors: ProductColor[];
  value: ProductColor;
  onChange: (c: ProductColor) => void;
  imagesByColor: Partial<Record<ProductColor, string>>;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {colors.map((c) => {
        const src = imagesByColor[c];
        const selected = value === c;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            title={colorLabels[c]}
            aria-label={colorLabels[c]}
            aria-pressed={selected}
            className={`relative h-14 w-14 overflow-hidden rounded-2xl border-2 bg-mist shadow-sm transition sm:h-16 sm:w-16 ${
              selected
                ? "scale-105 border-accent ring-2 ring-accent/30"
                : "border-line hover:border-accent/50"
            }`}
          >
            {src ? (
              <Image
                src={src}
                alt={colorLabels[c]}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            ) : (
              <span
                className="absolute inset-2 rounded-full"
                style={{ background: COLOR_SWATCH[c] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
