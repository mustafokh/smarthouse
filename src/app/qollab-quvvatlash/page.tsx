"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ProductCard";
import { OWNER_PHONE, TELEGRAM_URL } from "@/data/contact";

export default function SupportPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const key = "sh777_support";
    const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
    prev.unshift({
      topic: fd.get("topic"),
      phone: fd.get("phone"),
      text: fd.get("text"),
      at: new Date().toISOString(),
    });
    localStorage.setItem(key, JSON.stringify(prev));
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <div className="bg-circuit min-h-screen">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Yordam"
          title="Qo‘llab-quvvatlash"
          subtitle="Texnik savol yoki buyurtma holati — yozing yoki qo‘ng‘iroq qiling."
        />

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href={OWNER_PHONE.telHref}
            className="rounded-xl bg-cyan px-4 py-2.5 font-bold text-brand"
          >
            {OWNER_PHONE.display}
          </a>
          <Link href="/savol-javob" className="rounded-xl border border-line bg-white px-4 py-2.5 font-semibold text-brand">
            FAQ
          </Link>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-line bg-white px-4 py-2.5 font-semibold text-brand"
          >
            Telegram
          </a>
        </div>

        {sent ? (
          <p className="mt-8 rounded-xl bg-cyan/10 p-6 text-sm text-brand">
            Murojaatingiz qabul qilindi. Zarurat bo‘lsa{" "}
            <a href={OWNER_PHONE.telHref} className="font-semibold underline">
              {OWNER_PHONE.display}
            </a>{" "}
            ga qo‘ng‘iroq qiling.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-line bg-white p-6"
          >
            <label className="block text-sm">
              Mavzu
              <select
                name="topic"
                className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5"
              >
                <option>Texnik yordam</option>
                <option>Buyurtma holati</option>
                <option>O‘rnatish</option>
                <option>Boshqa</option>
              </select>
            </label>
            <label className="block text-sm">
              Telefoningiz
              <input
                name="phone"
                required
                className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              Muammo tavsifi
              <textarea
                name="text"
                required
                rows={4}
                className="mt-1.5 w-full rounded-xl border border-line bg-fog px-3 py-2.5"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white hover:bg-brand-deep"
            >
              Yuborish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
