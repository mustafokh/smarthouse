import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard, SectionHeading } from "@/components/ProductCard";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  return {
    title: cat?.name ?? "Kategoriya",
    description: cat?.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  const items = getProductsByCategory(cat.id);

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Link
          href="/katalog"
          className="text-sm font-medium text-cyan hover:underline"
        >
          ← Katalog
        </Link>
        <div className="mt-4">
          <SectionHeading
            eyebrow="Kategoriya"
            title={cat.name}
            subtitle={cat.description}
          />
        </div>
        <p className="mt-4 text-sm text-muted">{items.length} mahsulot</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
