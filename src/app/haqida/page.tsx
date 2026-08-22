import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Kompaniya haqida",
  description: "smart.house777 — smart uy va IoT yechimlari.",
};

export default function AboutPage() {
  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="smart.house777"
          title="Kompaniya haqida"
          subtitle="Smart uy, xavfsizlik va IoT — bitta professional vitrina."
        />
        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted">
          <p>
            <strong className="text-brand">smart.house777</strong> — O‘zbekiston
            bozorida smart uy qurilmalarini yetkazib beruvchi brend. Katalogimizda
            sensorni viklyuchatellar, Zigbee rele/modullar, shlyuzlar, sensorlar,
            smart karnizlar, termostat va yoritish yechimlari bor.
          </p>
          <p>
            Dizayn tizimi Telegram-bot vitrinasidan olingan: to‘q ko‘k brend
            (#0C1F44), sian aksent (#2FB6D9), qulay katalog → kartochka → savat →
            buyurtma oqimi.
          </p>
          <p>
            Bizning maqsadimiz — uy va ofisni sodda, ishonchli va chiroyli smart
            qilish. Har bir mahsulot prayslistdagi kod, narx va asosiy
            xususiyatlar bilan berilgan.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/katalog"
            className="rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-brand"
          >
            Katalog
          </Link>
          <Link
            href="/aloqa"
            className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-brand"
          >
            Bog‘lanish
          </Link>
        </div>
      </div>
    </div>
  );
}
