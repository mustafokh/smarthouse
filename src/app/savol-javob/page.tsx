import type { Metadata } from "next";
import { SectionHeading } from "@/components/ProductCard";
import { DELIVERY, OWNER_PHONE } from "@/data/contact";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Tez-tez so‘raladigan savollar — smart.house777",
};

const faqs = [
  {
    q: "Qanday buyurtma beraman?",
    a: "Katalogdan mahsulotni tanlang, rang va miqdorni belgilang, savatga qo‘shing va «Buyurtmani rasmiylashtirish» orqali ism/telefon qoldiring. Yoki to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qiling.",
  },
  {
    q: "Yetkazib berish qancha turadi?",
    a: `${DELIVERY.tashkentFree} ${DELIVERY.regions}`,
  },
  {
    q: "Wi-Fi va Zigbee farqi nima?",
    a: "Wi-Fi qurilmalar to‘g‘ridan-to‘g‘ri router orqali ishlaydi. Zigbee uchun odatda SDZ-004 shlyuz kerak — u ko‘plab sensor va relelarni birlashtiradi.",
  },
  {
    q: "Rang tanlash mumkinmi?",
    a: "Ha. Masalan VKL seriyasi oq, qora, oltin va kulrangda. Mahsulot sahifasida rangni tanlab savatga qo‘shing.",
  },
  {
    q: "Qanday bog‘lanaman?",
    a: `Telefon: ${OWNER_PHONE.display}. Buyurtma yoki konsultatsiya bo‘yicha shu raqamga qo‘ng‘iroq qiling.`,
  },
  {
    q: "To‘lov qanday?",
    a: "Buyurtma tasdiqlangach to‘lov usuli (naqd, karta, o‘tkazma) menejer bilan kelishiladi.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Yordam"
          title="Tez-tez so‘raladigan savollar"
        />
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-line bg-white open:shadow-md"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-display font-semibold text-brand marker:content-none">
                <span className="flex items-center justify-between gap-3">
                  {f.q}
                  <span className="text-cyan transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          Qo‘ng‘iroq:{" "}
          <a
            href={OWNER_PHONE.telHref}
            className="font-semibold text-brand hover:text-cyan"
          >
            {OWNER_PHONE.display}
          </a>
        </p>
      </div>
    </div>
  );
}
