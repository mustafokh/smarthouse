import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-cyan">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-brand">
        Sahifa topilmadi
      </h1>
      <p className="mt-2 text-muted">
        Bu manzil mavjud emas. Katalogga qayting.
      </p>
      <Link
        href="/katalog"
        className="mt-8 inline-block rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-brand"
      >
        Katalog
      </Link>
    </div>
  );
}
