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

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wish = isWishlisted(product.id);
  const defaultColor = product.colors[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[0_8px_30px_-18px_rgba(12,31,68,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-20px_rgba(47,182,217,0.45)] sm:rounded-2xl">
      <Link
        href={`/mahsulot/${product.slug}`}
        className="product-shine relative block aspect-square bg-gradient-to-br from-mist to-white"
      >
        <Image
          src={product.image}
          alt={product.nameUz}
          fill
          className="object-contain p-3 sm:p-5 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        <span className="absolute left-1.5 top-1.5 rounded bg-brand/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cyan sm:left-3 sm:top-3 sm:px-2 sm:text-[10px]">
          {product.code}
        </span>
        <span className="absolute right-1.5 top-1.5 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-medium uppercase text-brand sm:right-3 sm:top-3 sm:px-2 sm:text-[10px]">
          {product.protocol}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:gap-2 sm:p-4">
        <Link href={`/mahsulot/${product.slug}`}>
          <h3 className="font-display text-sm font-semibold leading-snug text-ink transition group-hover:text-brand sm:text-base">
            {product.nameUz}
          </h3>
        </Link>
        <p className="line-clamp-2 hidden text-xs leading-relaxed text-muted sm:block">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-1.5 sm:flex-row sm:items-end sm:justify-between sm:pt-2">
          <p className="font-display text-lg font-bold text-brand sm:text-xl">
            {formatPrice(product.price)}
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`rounded-lg border px-2 py-1.5 text-sm transition sm:px-2.5 sm:py-2 ${
                wish
                  ? "border-cyan bg-cyan/15 text-brand"
                  : "border-line text-muted hover:border-cyan"
              }`}
              aria-label="Sevimlilarga"
            >
              ♥
            </button>
            <button
              type="button"
              onClick={() => addToCart(product.id, defaultColor)}
              className="flex-1 rounded-lg bg-cyan px-2 py-1.5 text-xs font-semibold text-brand transition hover:bg-cyan-soft sm:flex-none sm:px-3 sm:py-2 sm:text-sm"
            >
              + Savat
            </button>
          </div>
        </div>
      </div>
    </article>
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

/** Photo stickers when imagesByColor is available; otherwise flat color dots. */
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
            value === c ? "scale-110 border-cyan" : "border-line"
          }`}
          style={{ background: COLOR_SWATCH[c] }}
          aria-label={colorLabels[c]}
        />
      ))}
    </div>
  );
}

/** Circular product-photo stickers for multi-color SKUs (e.g. Yandex Stansiya Midi). */
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
                ? "scale-105 border-cyan ring-2 ring-cyan/30"
                : "border-line hover:border-cyan/50"
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-muted">{subtitle}</p>
      )}
    </div>
  );
}
