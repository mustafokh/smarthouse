import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ProductCard";
import { DELIVERY, OWNER_PHONE } from "@/data/contact";

export const metadata: Metadata = {
  title: "Yetkazib berish va to‘lov",
};

export default function DeliveryPage() {
  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Logistika"
          title="Yetkazib berish va to‘lov"
          subtitle={DELIVERY.tashkentFree}
        />
        <div className="mt-10 space-y-6">
          <article className="rounded-2xl border border-cyan/30 bg-cyan/10 p-6">
            <h3 className="font-display text-lg font-bold text-brand">
              Toshkent — bepul
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand/80">
              {DELIVERY.tashkentFree} Buyurtmani rasmiylashtiring — shahar ichida
              dostavka uchun qo‘shimcha to‘lov yo‘q.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-lg font-bold text-brand">
              Viloyatlar
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {DELIVERY.regions} Narx va muddat buyurtma hajmiga bog‘liq —
              telefon orqali aniqlashtiramiz.
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-lg font-bold text-brand">
              To‘lov
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Buyurtma tasdiqlangach, to‘lov usuli (naqd, karta, o‘tkazma)
              menejer bilan kelishiladi. Saytdagi narxlar USD da (prayslist
              bo‘yicha).
            </p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-display text-lg font-bold text-brand">
              Bog‘lanish
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Savollar bo‘lsa qo‘ng‘iroq qiling:{" "}
              <a
                href={OWNER_PHONE.telHref}
                className="font-semibold text-brand hover:text-cyan"
              >
                {OWNER_PHONE.display}
              </a>
            </p>
          </article>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={OWNER_PHONE.telHref}
            className="rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-brand"
          >
            Qo‘ng‘iroq qilish
          </a>
          <Link
            href="/aloqa"
            className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-brand"
          >
            Konsultatsiya
          </Link>
        </div>
      </div>
    </div>
  );
}
